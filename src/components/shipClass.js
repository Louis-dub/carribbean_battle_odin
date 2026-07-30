class Ship {
    constructor(len, p1, p2) {
        this.length = len;
        this.numHit = 0;
        this.sunk = false;
        this.coor = [p1, p2];
    }

    sortCoor(p1, p2) {
        const d1 = p1[0] - p2[0];
        const d2 = p1[1] - p2[1];

        if (d1 < 0 || d2 < 0)
            return [p2, p1];
        else
            return [p1, p2];
    }

    hit(p) {
        if (this.coor[0][0] <= p[0] && this.coor[1][0] >= p[0] &&
            this.coor[0][1] <= p[1] && this.coor[1][1] >= p[1]) {
            this.numHit++;
            return true;
        }
        return false;
    }

    isSunk() {

    }
}

export { Ship };