export function attack(board, pos) {
    if (!pos)
        return false;
    const val = pos.value;
    const p = [parseInt(val[0], 10), parseInt(val[2], 10)];
    
    console.log(p);
    if (board.receiveAttack(p[0], p[1]))
        pos.className += " touch";
    else
        pos.className += " miss"
}