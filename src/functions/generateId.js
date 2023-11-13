module.exports = () => {
    function genRandInt() {
        return Math.floor(Math.random() * 95192);
    }

    return `mv${genRandInt()}-2${genRandInt()}5-${genRandInt()}g`;
};
