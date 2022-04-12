'use strict';

export function doctorItem(item) {
    return `
        <div>
            <div class="input_wrap">
                <input
                    type="checkbox"
                    id="list_check"
                    class="green_custom"
                />
                <label for="list_check"></label>
                <label for="list_check">
                    <span>${item.userName} ${item.jikchek}</span>

                    <span>${item.meddeptnm}</span>
                </label>
            </div>

            <div class="favorite_container">
                <input
                    type="checkbox"
                    id="favorite_list"
                />
                <label for="favorite_list"></label>
            </div>
        </div>
    `;
}
