import { multiply } from '../services/add.service';

test('multiplies numbers', () => {
    expect.assertions(4)
  expect(multiply(2, 3)).toEqual(6);
  expect(multiply(3, 3)).toEqual(9);
  expect(multiply(4, 3)).toEqual(12);
  expect(multiply(5, 3)).toEqual(15);
});

test('complex object snapshot', () => {
  const user = {
    name: 'jimmy',
    age: 20,
    address:{ street:'12222 nyeri'}
  };
  expect(user).toMatchSnapshot({
    age: expect.any(Number),
    address: {
      street: expect.any(String)
    }
  })
})