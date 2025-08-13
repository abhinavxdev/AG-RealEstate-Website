import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import Home from "./pages/Home";
import Header from "./components/layouts/header";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/Forgot-password";
import PageNotFound from "./pages/Page-not-found";
import ContactUs from "./pages/Contact-us";
import AboutPage from "./pages/About-us";
import TermsPage from "./pages/Terms";
import PrivacyPolicyPage from "./pages/Privacy";
import CareersPage from "./pages/career";
import SubmitProperty from "./pages/Submit-Property";
import ListingDetails from "./pages/detailedListing";
import AllListings from "./pages/allListings";
import CategoryPage from "./pages/categoryPage";
import CategoryMenu from "./components/layouts/categoryMenu";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/layouts/footer";

// For User Dashboard 
import UserRoute from "./components/routes/userRoute";
import UserDashboard from "./pages/User/userDashboard";
import EditProfile from "./pages/User/editProfile";
import SupportPage from "./pages/User/supportPage";

// For Admin Dashboard 
import AdminRoute from "./components/routes/adminRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import LeadsPage from "./pages/admin/leadDashboard";
import ContactDashboard from "./pages/admin/contactDashboard";
import UserDetails from "./pages/admin/userDetails";
import AdminProperties from "./pages/admin/getProperties";
import NewsletterDashboard from "./pages/admin/newsletterDashboard";
import CreateListing from "./pages/admin/createListing";
import ManageCategories from "./pages/admin/createCategories";
import ManageListings from "./pages/admin/manageListings";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/submit-property" element={<SubmitProperty />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/listings/:slug" element={<ListingDetails />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/categories" element={<CategoryMenu />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/edit-profile" element={<EditProfile />} />
          <Route path="user/support" element={<SupportPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/lead-dashboard" element={<LeadsPage />} />
          <Route path="admin/user-details" element={<UserDetails />} />
          <Route path="admin/contact-dashboard" element={<ContactDashboard />} />
          <Route path="admin/get-properties" element={<AdminProperties />} />
          <Route path="admin/newsletter-dashboard" element={<NewsletterDashboard />} />
          <Route path="admin/create-listing" element={<CreateListing />} />
          <Route path="admin/create-category" element={<ManageCategories />} />
          <Route path="admin/manage-listings" element={<ManageListings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;