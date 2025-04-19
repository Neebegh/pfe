import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from '../../pages/Products';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock des données de produits
const mockProducts = [
  {
    id: 1,
    name: "T-Shirt Slim Fit",
    price: 59,
    rating: 4,
    image: "test.jpg",
    sizes: ['S', 'M']
  },
  {
    id: 2,
    name: "Jean Classic",
    price: 129,
    rating: 5,
    image: "test.jpg",
    sizes: ['M', 'L']
  }
];

// Mock de la fonction fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProducts),
  })
);

describe('Composant Products', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('1. Affiche le loader pendant le chargement', async () => {
    render(
      <Router>
        <Products />
      </Router>
    );
    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test('2. Affiche les produits après chargement', async () => {
    render(
      <Router>
        <Products />
      </Router>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Nos Produits/i)).toBeInTheDocument();
      expect(screen.getByText(/T-Shirt Slim Fit/i)).toBeInTheDocument();
      expect(screen.getByText(/Jean Classic/i)).toBeInTheDocument();
    });
  });

  test('3. Affiche "Aucun produit" quand la liste est vide', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
    
    render(
      <Router>
        <Products />
      </Router>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/Aucun produit trouvé/i)).toBeInTheDocument();
    });
  });

  test('4. Affiche correctement les étoiles de notation', async () => {
    render(
      <Router>
        <Products />
      </Router>
    );
    
    await waitFor(() => {
      const stars = screen.getAllByTestId('star-icon');
      // Le premier produit a 4 étoiles (rating: 4)
      expect(stars[0]).toHaveStyle('color: #FFD700'); // étoile pleine
      expect(stars[4]).toHaveStyle('color: #C4C4C4'); // étoile vide
    });
  });
});