class CustomJanus {

    debug = 'all';
    janus = null;
    sfuTest = null;
    server = 'https://webrtc.seers-visual-system.link';
    username = '';
    handle = null;
    opaqueId = '';
    room = '';
    id = '';
    stream = null;
    pvtId = '';
    feeds = [];
    bitrateTimer = [];

    doSimulcast = '';
    doSimulcast2 = '';
    aCodec = '';
    vCodec = '';
    subscriberMode = '';

    callbacks = {
        local: {
            reject: () => {
            },
            join: () => {
            },
            complete: () => {
            },
            noWebcam: () => {
            },
            cleanUp: () => {
            },
            events: {
                joined: () => {
                },
                destroyed: () => {
                },
                leaving: () => {
                },
                unpublished: () => {
                }
            }
        },
        remote: {
            videoWidth: '',
            videoHeight: '',
            reject: () => {
            },
            join: (index, name) => {
            },
            complete: () => {
            },
            noWebcam: (index, name) => {
            },
            cleanUp: (index) => {
            },
            events: {
                attached: () => {
                },
                others: () => {
                }
            }
        }
    };

    constructor(room = '', username = '', local = null, remote = null) {
        this.room = room;
        this.username = username;
        this.doSimulcast = (this.getQuery('simulcast') === 'yes' || this.getQuery('simulcast') === 'true');
        this.doSimulcast2 = (this.getQuery('simulcast2') === 'yes' || this.getQuery('simulcast2') === 'true');
        this.aCodec = (this.getQuery('a-codec') !== '' ? this.getQuery('a-codec') : null);
        this.vCodec = (this.getQuery('v-codec') !== '' ? this.getQuery('v-codec') : null);
        this.subscriberMode = (this.getQuery('subscriber-mode') === 'yes' || this.getQuery('subscriber-mode') === 'true');
        this.opaqueId = 'videoroom-' + Janus.randomString(12);
        if (local) this.callbacks.local = { ...this.callbacks.local, ...local };
        if (remote) this.callbacks.remote = { ...this.callbacks.remote, ...remote };
    }

    init() {
        Janus.init({
            debug: this.debug,
            callback: () => {
                if (!Janus.isWebrtcSupported()) {
                    Janus.log('No WebRTC support... ');
                    return;
                }
                // Create session
                this.janus = new Janus(
                    {
                        server: this.server,
                        success: () => {
                            // Attach to VideoRoom plugin
                            this.janus.attach(
                                {
                                    plugin: 'janus.plugin.videoroom',
                                    opaqueId: this.opaqueId,
                                    success: (pluginHandle) => {
                                        this.sfuTest = pluginHandle;
                                        Janus.log('Plugin attached! (' + this.sfuTest.getPlugin() + ', id=' + this.sfuTest.getId() + ')');
                                        Janus.log('  -- This is a publisher/manager');
                                        this.registerUsername(this.username);
                                    },
                                    error: function(error) {
                                        Janus.error('  -- Error attaching plugin...', error);
                                        alert('Error attaching plugin... ' + error);
                                    },
                                    consentDialog: function(on) {
                                        Janus.log('Consent dialog should be ' + (on ? 'on' : 'off') + ' now');
                                        if (on) {
                                            // Darken screen and show hint
                                            // $.blockUI({
                                            //     message: '<div><img src="up_arrow.png"/></div>',
                                            //     css: {
                                            //         border: 'none',
                                            //         padding: '15px',
                                            //         backgroundColor: 'transparent',
                                            //         color: '#aaa',
                                            //         top: '10px',
                                            //         left: (navigator.mozGetUserMedia ? '-100px' : '300px')
                                            //     }
                                            // });
                                        } else {
                                            // Restore screen
                                            // $.unblockUI();
                                        }
                                    },
                                    iceState: function(state) {
                                        Janus.log('ICE state changed to ' + state);
                                    },
                                    mediaState: function(medium, on) {
                                        Janus.log('Janus ' + (on ? 'started' : 'stopped') + ' receiving our ' + medium);
                                    },
                                    webrtcState: function(on) {
                                        Janus.log('Janus says our WebRTC PeerConnection is ' + (on ? 'up' : 'down') + ' now');
                                        // $('#videolocal').parent().parent().unblock();
                                        if (!on) return;
                                        // $('#publish').remove();
                                        // This controls allows us to override the global room bitrate cap
                                        // $('#bitrate').parent().parent().removeClass('hide').show();
                                        // $('#bitrate a').click(function() {
                                        //     var id = $(this).attr('id');
                                        //     var bitrate = parseInt(id) * 1000;
                                        //     if (bitrate === 0) {
                                        //         Janus.log('Not limiting bandwidth via REMB');
                                        //     } else {
                                        //         Janus.log('Capping bandwidth to ' + bitrate + ' via REMB');
                                        //     }
                                        //     $('#bitrateset').html($(this).html() + '<span class="caret"></span>').parent().removeClass('open');
                                        //     this.sfuTest.send({ message: { request: 'configure', bitrate: bitrate } });
                                        //     return false;
                                        // });
                                    },
                                    onmessage: (msg, jsep) => {
                                        Janus.log(' ::: Got a message (publisher) :::', msg, jsep);
                                        const event = msg['videoroom'];
                                        Janus.log('Event: ' + event);
                                        if (event) {
                                            if (event === 'joined') {
                                                // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                                                this.id = msg['id'];
                                                this.pvtId = msg['private_id'];
                                                Janus.log('Successfully joined room ' + msg['room'] + ' with ID ' + this.id);
                                                if (this.subscriberMode) {
                                                    // $('#videojoin').hide();
                                                    // $('#videos').removeClass('hide').show();
                                                } else {
                                                    this.publishOwnFeed(true);
                                                }
                                                // Any new feed to attach to?
                                                if (msg['publishers']) {
                                                    const list = msg['publishers'];
                                                    Janus.log('Got a list of available publishers/feeds:', list);
                                                    for (let f in list) {
                                                        const id = list[f]['id'];
                                                        const display = list[f]['display'];
                                                        const audio = list[f]['audio_codec'];
                                                        const video = list[f]['video_codec'];
                                                        Janus.log('  >> [' + id + '] ' + display + ' (audio: ' + audio + ', video: ' + video + ')');
                                                        this.newRemoteFeed(id, display, audio, video);
                                                    }
                                                }

                                                if (typeof this.callbacks.local.events.joined === 'function') this.callbacks.local.events.joined();
                                            } else if (event === 'destroyed') {
                                                // The room has been destroyed
                                                Janus.warn('The room has been destroyed!');
                                                if (typeof this.callbacks.local.events.destroyed === 'function') this.callbacks.local.events.destroyed();
                                            } else if (event === 'event') {
                                                // Any new feed to attach to?
                                                if (msg['publishers']) {
                                                    const list = msg['publishers'];
                                                    Janus.log('Got a list of available publishers/feeds:', list);
                                                    for (let f in list) {
                                                        const id = list[f]['id'];
                                                        const display = list[f]['display'];
                                                        const audio = list[f]['audio_codec'];
                                                        const video = list[f]['video_codec'];
                                                        Janus.log('  >>> [' + id + '] ' + display + ' (audio: ' + audio + ', video: ' + video + ')');
                                                        this.newRemoteFeed(id, display, audio, video);
                                                    }
                                                } else if (msg['leaving']) {
                                                    // One of the publishers has gone away?
                                                    const leaving = msg['leaving'];
                                                    Janus.log('Publisher left leaving: ' + leaving);
                                                    const remoteFeed = this.feeds.find(item => item?.rfid === leaving);
                                                    if (remoteFeed != null) {
                                                        Janus.log('Feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') has left the room, detaching');
                                                        if (this.bitrateTimer[remoteFeed.rfindex]) clearInterval(this.bitrateTimer[remoteFeed.rfindex]);
                                                        this.feeds[remoteFeed.rfindex] = null;
                                                        remoteFeed.detach();
                                                    }
                                                    if (typeof this.callbacks.local.events.leaving === 'function') this.callbacks.local.events.leaving();
                                                } else if (msg['unpublished']) {
                                                    // One of the publishers has unpublished?
                                                    const unpublished = msg['unpublished'];
                                                    Janus.log('Publisher left unpublished: ' + unpublished, this.feeds);
                                                    if (unpublished === 'ok') {
                                                        // That's us
                                                        this.sfuTest.hangup();
                                                        return;
                                                    }
                                                    const remoteFeed = this.feeds.find(item => item?.rfid === unpublished);
                                                    // if (remoteFeed != null) {
                                                    //     Janus.log('Feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') has left the room, detaching');
                                                    //     if (this.bitrateTimer[remoteFeed.rfindex]) clearInterval(this.bitrateTimer[remoteFeed.rfindex]);
                                                    //     this.feeds[remoteFeed.rfindex] = null;
                                                    //     remoteFeed.detach();
                                                    // }
                                                    if (typeof this.callbacks.local.events.unpublished === 'function') this.callbacks.local.events.unpublished(remoteFeed.rfindex);
                                                } else if (msg['error']) {
                                                    if (msg['error_code'] === 426) {
                                                        // This is a "no such room" error: give a more meaningful description
                                                        Janus.log(
                                                            '<p>Apparently room <code>' + this.room + '</code> (the one this demo uses as a test room) ' +
                                                            'does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> ' +
                                                            'configuration file? If not, make sure you copy the details of room <code>' + this.room + '</code> ' +
                                                            'from that sample in your current configuration file, then restart Janus and try again.'
                                                        );
                                                    } else {
                                                        Janus.log(msg['error']);
                                                    }
                                                }
                                            }
                                        }
                                        if (jsep) {
                                            Janus.log('Handling SDP as well...', jsep);
                                            this.sfuTest.handleRemoteJsep({ jsep: jsep });
                                            // Check if any of the media we wanted to publish has
                                            // been rejected (e.g., wrong or unsupported codec)
                                            const audio = msg['audio_codec'];
                                            if (this.stream && this.stream.getAudioTracks() && this.stream.getAudioTracks().length > 0 && !audio) {
                                                // Audio has been rejected
                                                Janus.log('Our audio stream has been rejected, viewers won\'t hear us');
                                            }
                                            const video = msg['video_codec'];
                                            if (this.stream && this.stream.getVideoTracks() && this.stream.getVideoTracks().length > 0 && !video) {
                                                // Video has been rejected
                                                // toastr.warning('Our video stream has been rejected, viewers won\'t see us');
                                                // Hide the webcam video
                                                // $('#myvideo').hide();
                                                // $('#local-video').append(
                                                //     '<div class="no-video-container">' +
                                                //     '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                                                //     '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                                                //     '</div>');

                                                if (typeof this.callbacks.local.reject === 'function') this.callbacks.local.reject();
                                            }
                                        }
                                    },
                                    onlocalstream: (stream) => {
                                        Janus.log(' ::: Got a local stream :::', stream);
                                        this.stream = stream;
                                        let target = '';
                                        if (typeof this.callbacks.local.join === 'function') {
                                            // Must be a string, ID of video object.
                                            target = this.callbacks.local.join();
                                        } else {
                                            Janus.log('There\'s no attach video function.');
                                            return false;
                                        }

                                        const $target = $(`#${target}`);
                                        // $('#videojoin').hide();
                                        // $('#videos').removeClass('hide').show();
                                        // if ($('#myvideo').length === 0) {
                                        //     $('#videolocal').append('<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
                                        //     // Add a 'mute' button
                                        //     $('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>');
                                        //     $('#mute').click(this.toggleMute);
                                        //     // Add an 'unpublish' button
                                        //     $('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>');
                                        //     $('#unpublish').click(this.unpublishOwnFeed);
                                        // }
                                        // $('#publisher').removeClass('hide').html(this.username).show();
                                        if ($target.length > 0) {
                                            Janus.attachMediaStream($target.get(0), stream);
                                            $target.get(0).muted = 'muted';
                                        }
                                        if (this.sfuTest.webrtcStuff.pc.iceConnectionState !== 'completed' &&
                                            this.sfuTest.webrtcStuff.pc.iceConnectionState !== 'connected') {
                                            if (typeof this.callbacks.local.complete === 'function') this.callbacks.local.complete();
                                        }

                                        const videoTracks = stream.getVideoTracks();
                                        if (!videoTracks || videoTracks.length === 0) {
                                            // No webcam
                                            if (typeof this.callbacks.local.noWebcam === 'function') this.callbacks.local.noWebcam();
                                            // $(`#${target.video}`).hide();
                                            // if ($('#videolocal .no-video-container').length === 0) {
                                            //     $('#videolocal').append(
                                            //         '<div class="no-video-container">' +
                                            //         '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                                            //         '<span class="no-video-text">No webcam available</span>' +
                                            //         '</div>');
                                            // }
                                        } else {
                                            // $('#videolocal .no-video-container').remove();
                                            // $('#myvideo').removeClass('hide').show();
                                        }
                                    },
                                    onremotestream: function(stream) {
                                        // The publisher stream is sendonly, we don't expect anything here
                                    },
                                    oncleanup: () => {
                                        Janus.log(' ::: Got a cleanup notification: we are unpublished now :::');
                                        this.stream = null;
                                        if (typeof this.callbacks.local.cleanUp === 'function') this.callbacks.local.cleanUp();
                                        // $('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
                                        // $('#publish').click(() => {
                                        //     this.publishOwnFeed(true);
                                        // });
                                        // $('#videolocal').parent().parent().unblock();
                                        // $('#bitrate').parent().parent().addClass('hide');
                                        // $('#bitrate a').unbind('click');
                                    }
                                });
                        },
                        error: function(error) {
                            Janus.error(error);
                            // alert(error, function() {
                            //     window.location.reload();
                            // });
                        },
                        destroyed: function() {
                            window.location.reload();
                        }
                    });
                // });
            }
        });
    }

    bitrate(bitrate) {
        this.sfuTest.send({ message: { request: 'configure', bitrate: bitrate } });
    }

    destroy() {
        this.janus.destroy();
    }

    checkEnter(field, event) {
        const theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (theCode * 1 === 13) {
            registerUsername();
            return false;
        } else {
            return true;
        }
    }

    registerUsername(username) {
        if (username === '') {
            Janus.log('Please input username.');
            return false;
        }
        if (/[^a-zA-Z\d]/.test(username)) {
            return false;
        }

        const register = {
            request: 'join',
            room: this.room,
            ptype: 'publisher',
            display: username
        };
        this.username = username;
        this.sfuTest.send({ message: register });
    }


    publishOwnFeed(useAudio) {
        this.sfuTest.createOffer(
            {
                // Add data:true here if you want to publish datachannels as well
                media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },	// Publishers are sendonly
                // If you want to test simulcasting (Chrome and Firefox only), then
                // pass a ?simulcast=true when opening this demo page: it will turn
                // the following 'simulcast' property to pass to janus.js to true
                simulcast: this.doSimulcast,
                simulcast2: this.doSimulcast2,
                success: (jsep) => {
                    Janus.log('Got publisher SDP!', jsep);
                    const publish = { request: 'configure', audio: useAudio, video: true, bitrate: 512000 };
                    // You can force a specific codec to use when publishing by using the
                    // audiocodec and videocodec properties, for instance:
                    // 		publish["audiocodec"] = "opus"
                    // to force Opus as the audio codec to use, or:
                    // 		publish["videocodec"] = "vp9"
                    // to force VP9 as the videocodec to use. In both case, though, forcing
                    // a codec will only work if: (1) the codec is actually in the SDP (and
                    // so the browser supports it), and (2) the codec is in the list of
                    // allowed codecs in a room. With respect to the point (2) above,
                    // refer to the text in janus.plugin.videoroom.jcfg for more details.
                    // We allow people to specify a codec via query string, for demo purposes
                    if (this.aCodec) publish['audiocodec'] = this.aCodec;
                    if (this.vCodec) publish['videocodec'] = this.vCodec;
                    this.sfuTest.send({ message: publish, jsep: jsep });
                },
                error: (error) => {
                    Janus.error('WebRTC error:', error);
                    if (useAudio) {
                        this.publishOwnFeed(false);
                    } else {
                        Janus.log('WebRTC error... ' + error.message);
                        // $('#publish').removeAttr('disabled').click(() => {
                        //     this.publishOwnFeed(true);
                        // });
                    }
                }
            });
    }

    toggleAudioMute() {
        console.log(this.sfuTest);
        let muted = this.sfuTest.isAudioMuted();
        Janus.log((muted ? 'Unmuting' : 'Muting') + ' local stream...');
        if (muted) this.sfuTest.unmuteAudio();
        else this.sfuTest.muteAudio();
        muted = this.sfuTest.isAudioMuted();
        return muted;
    }

    toggleVideoMute() {
        let muted = this.sfuTest.isVideoMuted();
        Janus.log((muted ? 'Unmuting' : 'Muting') + ' local stream...');
        if (muted) this.sfuTest.unmuteVideo();
        else this.sfuTest.muteVideo();
        muted = this.sfuTest.isVideoMuted();
        return muted;
    }

    unpublishOwnFeed() {
        // Unpublish our stream
        const unpublish = { request: 'unpublish' };
        this.sfuTest.send({ message: unpublish });
    }

    newRemoteFeed(id, display, audio, video) {
        // A new feed has been published, create a new plugin handle and attach to it as a subscriber
        let remoteFeed = null;
        this.janus.attach({
            plugin: 'janus.plugin.videoroom',
            opaqueId: this.opaqueId,
            success: (pluginHandle) => {
                remoteFeed = pluginHandle;
                remoteFeed.simulcastStarted = false;
                Janus.log('Plugin attached! (' + remoteFeed.getPlugin() + ', id=' + remoteFeed.getId() + ')');
                Janus.log('  -- This is a subscriber');
                // We wait for the plugin to send us an offer
                let subscribe = {
                    request: 'join',
                    room: this.room,
                    ptype: 'subscriber',
                    feed: id,
                    private_id: this.pvtId
                };
                // In case you don't want to receive audio, video or data, even if the
                // publisher is sending them, set the 'offer_audio', 'offer_video' or
                // 'offer_data' properties to false (they're true by default), e.g.:
                // 		subscribe["offer_video"] = false;
                // For example, if the publisher is VP8 and this is Safari, let's avoid video
                if (Janus.webRTCAdapter.browserDetails.browser === 'safari' &&
                    (video === 'vp9' || (video === 'vp8' && !Janus.safariVp8))) {
                    if (video) video = video.toUpperCase();
                    subscribe['offer_video'] = false;
                }
                remoteFeed.videoCodec = video;
                remoteFeed.send({ message: subscribe });
            },
            error: function(error) {
                Janus.error('  -- Error attaching plugin...', error);
                Janus.log('Error attaching plugin... ' + error);
            },
            onmessage: (msg, jsep) => {
                Janus.log(' ::: Got a message (subscriber) :::', msg);
                const event = msg['videoroom'];
                Janus.log('Event: ' + event);
                if (msg['error']) {
                    Janus.log(msg['error']);
                } else if (event) {
                    if (event === 'attached') {
                        // Subscriber created and attached
                        remoteFeed.rfindex = this.feeds.length;
                        remoteFeed.rfid = msg['id'];
                        remoteFeed.rfdisplay = msg['display'];
                        if (!remoteFeed.spinner) {
                            const target = document.getElementById('video-remote' + remoteFeed.rfindex);
                            remoteFeed.spinner = new Spinner({ top: 100 }).spin(target);
                        } else {
                            remoteFeed.spinner.spin();
                        }
                        this.feeds[this.feeds.length] = remoteFeed;
                        Janus.log('Successfully attached to feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') in room ' + msg['room']);
                        if (typeof this.callbacks.remote.events.attached === 'function') this.callbacks.remote.events.attached();
                    } else if (event === 'event') {
                        // Check if we got a simulcast-related event from this publisher
                        const subStream = msg['substream'];
                        const temporal = msg['temporal'];
                        if ((subStream !== null && subStream !== undefined) || (temporal !== null && temporal !== undefined)) {
                            if (!remoteFeed.simulcastStarted) {
                                remoteFeed.simulcastStarted = true;
                                // Add some new buttons
                                // addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === 'vp8' || remoteFeed.videoCodec === 'h264');
                            }
                            // We just received notice that there's been a switch, update the buttons
                            // updateSimulcastButtons(remoteFeed.rfindex, subStream, temporal);
                        }
                        if (typeof this.callbacks.remote.events.others === 'function') this.callbacks.remote.events.others();
                    } else {
                        // What has just happened?
                    }
                }
                if (jsep) {
                    Janus.log('Handling SDP as well...', jsep);
                    // Answer and attach
                    remoteFeed.createAnswer({
                        jsep: jsep,
                        // Add data:true here if you want to subscribe to datachannels as well
                        // (obviously only works if the publisher offered them in the first place)
                        media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                        success: (jsep) => {
                            Janus.log('Got SDP!', jsep);
                            const body = { request: 'start', room: this.room };
                            remoteFeed.send({ message: body, jsep: jsep });
                        },
                        error: function(error) {
                            Janus.error('WebRTC error:', error);
                            Janus.log('WebRTC error... ' + error.message);
                        }
                    });
                }
            },
            iceState: function(state) {
                Janus.log('ICE state of this WebRTC PeerConnection (feed #' + remoteFeed.rfindex + ') changed to ' + state);
            },
            webrtcState: function(on) {
                Janus.log('Janus says this WebRTC PeerConnection (feed #' + remoteFeed.rfindex + ') is ' + (on ? 'up' : 'down') + ' now');
            },
            onlocalstream: function(stream) {
                // The subscriber stream is recvonly, we don't expect anything here
            },
            onremotestream: (stream) => {
                Janus.log('Remote feed #' + remoteFeed.rfindex + ', stream:', stream);
                let addButtons = false;
                let target = '';

                console.log(remoteFeed);
                if (typeof this.callbacks.remote.join === 'function') {
                    target = this.callbacks.remote.join(remoteFeed.rfindex);
                } else {
                    Janus.log('There\'s no remote attach video function.');
                    return false;
                }
                const $target = $(`#${target}`);

                if ($target.length > 0) Janus.attachMediaStream($target.get(0), stream);

                const videoTracks = stream.getVideoTracks();
                if (!videoTracks || videoTracks.length === 0) {
                    // No remote video
                    if (typeof this.callbacks.remote.noWebcam === 'function') this.callbacks.remote.noWebcam(remoteFeed.rfindex, remoteFeed.rfdisplay);
                    // $('#remotevideo' + remoteFeed.rfindex).hide();
                    // if ($('#video-remote' + remoteFeed.rfindex + ' .no-video-container').length === 0) {
                    //     $('#video-remote' + remoteFeed.rfindex).append(
                    //         '<div class="no-video-container">' +
                    //         '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                    //         '<span class="no-video-text">No remote video available</span>' +
                    //         '</div>');
                    // }
                } else {
                    // $('#video-remote' + remoteFeed.rfindex + ' .no-video-container').remove();
                    // $('#remotevideo' + remoteFeed.rfindex).removeClass('hide').show();
                }
                if (!addButtons) return;
                if (Janus.webRTCAdapter.browserDetails.browser === 'chrome' ||
                    Janus.webRTCAdapter.browserDetails.browser === 'firefox' ||
                    Janus.webRTCAdapter.browserDetails.browser === 'safari') {
                    // $('#curbitrate' + remoteFeed.rfindex).removeClass('hide').show();
                    this.bitrateTimer[remoteFeed.rfindex] = setInterval(function() {
                        // Display updated bitrate, if supported
                        const bitrate = remoteFeed.getBitrate();
                        // $('#curbitrate' + remoteFeed.rfindex).text(bitrate);
                        // Check if the resolution changed too
                        const $target = $(`#${target}`);
                        if ($target.length > 0) {
                            const width = $target.get(0).videoWidth;
                            const height = $target.get(0).videoHeight;
                            // if (width > 0 && height > 0) $('#curres' + remoteFeed.rfindex).removeClass('hide').text(width + 'x' + height).show();
                        }
                    }, 1000);
                }
            },
            oncleanup: () => {
                Janus.log(' ::: Got a cleanup notification (remote feed ' + id + ') :::');
                if (remoteFeed.spinner) remoteFeed.spinner.stop();
                remoteFeed.spinner = null;
                if (typeof this.callbacks.remote.cleanUp === 'function') this.callbacks.remote.cleanUp(remoteFeed.rfindex);
                if (this.bitrateTimer[remoteFeed.rfindex]) clearInterval(this.bitrateTimer[remoteFeed.rfindex]);
                this.bitrateTimer[remoteFeed.rfindex] = null;
                remoteFeed.simulcastStarted = false;
            }
        });
    }

    setDebugMode(debug) {
        this.debug = debug;
    }

    getQuery(name) {
        name = name.replace(/\[/, '\\[').replace(/\]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}