import {GameOfLife} from '../src/component/GameOfLife';

describe ('GameOfLife', () => {
    it('should initialize with the given rows and columns', () => {
        const game = new GameOfLife(34, 34);
        expect(game.getRows()).toBe(34);
        expect(game.getCols()).toBe(34);
    });
});