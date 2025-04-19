import { CartProvider } from './context/CartContext'; // à ajouter en haut

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider> {/* <= ici on entoure Layout */}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                {/* Routes protégées ici */}
              </Route>
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}
