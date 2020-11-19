
export function anglChengRad(ang) {
    return ang / 180 * Math.PI
}

export function stopAnim(name) {
    SetInterval.clear(`${name}`);

}

export function parseInt() {
    if (document.getElementById('input').value == "") {
        return 45;
    }

    return parseInt(document.getElementById('input').value);
}
