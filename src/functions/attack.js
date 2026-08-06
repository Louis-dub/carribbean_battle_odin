export function attack(board, pos) {
    if (!pos)
        return false;
    const val = pos.value;
    const p = val.split(' ').map(Number);;
    
    console.log(p);
    if (board.receiveAttack(p[0], p[1]))
        pos.className += " touch";
    else
        pos.className += " miss"
}