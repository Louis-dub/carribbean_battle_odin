export function attack(gridTarget, pos) {
    if (!pos)
        return false;
    const val = pos.getAttribute("value");
    console.log(parseInt(val[0], 10), parseInt(val[2], 10));
}