import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Products from '../products';

const server = setupServer(
  rest.get('http://localhost:8080/products', (req, res, ctx) => {
    return res(ctx.json([
      {
        name : "caneta",
        defaultPrice:"10",
        productType: "1",
      }
    ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders products", async () => {
  
  render(
    <MemoryRouter><Products /></MemoryRouter>
  )
  const element = await screen.findByText('caneta');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent('caneta');
})

test('matches snapshot', () => {
  const tree = renderer.create(
    
    <MemoryRouter><Products /></MemoryRouter>
  
  ).toJSON();
  expect(tree).toMatchSnapshot();
  
});