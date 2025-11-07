import React, { useEffect, useState } from "react";
import API from "../utils/api";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import ProgressCards from "../components/dashboard/ProgressCards";
import ReviewQueue from "../components/dashboard/ReviewQueue";
import CalendarSection from "../components/dashboard/CalendarSection";
import UpcomingSection from "../components/dashboard/UpcomingSection";
import ReviewedList from "../components/dashboard/ReviewedList";
import AllCardsList from "../components/dashboard/AllCardsList";
import CardModal from "../components/dashboard/CardModal";
import DeleteConfirmModal from "../components/dashboard/DeleteConfirmModal";
import CardFormModal from "../components/dashboard/CardFormModal";
import FilterModal from "../components/dashboard/FilterModal";
import "../styles/dashboard.css";

const Dashboard = () => {
  // ✅ Core states
  const [userData, setUserData] = useState(null);
  const [cards, setCards] = useState([]);
  const [reviewCards, setReviewCards] = useState([]);
  const [reviewedToday, setReviewedToday] = useState([]);
  const [viewMode, setViewMode] = useState("default");
  const [selectedCard, setSelectedCard] = useState(null);

  // ✅ Search + Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "all",
    status: "all",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Get user ID from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || storedUser?.id;

  // ✅ Fetch dashboard data
  useEffect(() => {
    if (!userId) {
      console.warn("No user found — redirecting to Signin...");
      window.location.href = "/signin";
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [userRes, cardsRes] = await Promise.all([
          API.get(`/users/${userId}`),
          API.get(`/cards/user/${userId}`),
        ]);

        const user = userRes.data.data;
        const fetchedCards = cardsRes.data.data || [];
        const todayStr = new Date().toISOString().split("T")[0];

        const reviewed = fetchedCards.filter(
          (c) => c.lastReviewed && c.lastReviewed.split("T")[0] === todayStr
        );

        const reviewQueue = fetchedCards.filter((c) => {
          if (!c.nextReview) return true;
          const nr = new Date(c.nextReview).toISOString().split("T")[0];
          return nr <= todayStr;
        });

        setUserData(user);
        setCards(fetchedCards);
        setReviewCards(reviewQueue);
        setReviewedToday(reviewed);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error.message);
      }
    };

    fetchDashboardData();
  }, [userId]);

  // ✅ Handle card review logic
  const handleCardReviewed = (card, quality) => {
    const nowIso = new Date().toISOString();
    const updated = { ...card, lastReviewed: nowIso, lastQuality: quality };

    setReviewCards((prev) => prev.filter((c) => c._id !== card._id));
    setReviewedToday((prev) => {
      if (prev.find((c) => c._id === card._id)) return prev;
      return [updated, ...prev];
    });
    setCards((prev) => prev.map((c) => (c._id === card._id ? updated : c)));
  };

  // ✅ Handle delete logic
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDeleteClick = (cardId) => {
    setPendingDeleteId(cardId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCard = async () => {
    if (!pendingDeleteId) return;
    try {
      await API.delete(`/cards/${pendingDeleteId}`);

      setCards((prev) => prev.filter((c) => c._id !== pendingDeleteId));
      setReviewedToday((prev) => prev.filter((c) => c._id !== pendingDeleteId));
      setReviewCards((prev) => prev.filter((c) => c._id !== pendingDeleteId));
    } catch (error) {
      console.error("❌ Error deleting card:", error.message);
    } finally {
      setIsDeleteModalOpen(false);
      setPendingDeleteId(null);
    }
  };

  // ✅ Create / Edit logic
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const openCreateCardModal = () => {
    setCardToEdit(null);
    setIsCardModalOpen(true);
  };

  const openEditCardModal = (card) => {
    setCardToEdit(card);
    setIsCardModalOpen(true);
  };

  const handleCardSubmit = async (data) => {
    try {
      if (cardToEdit) {
        const res = await API.put(`/cards/${cardToEdit._id}`, data);
        const updatedCard = res.data.data;
        setCards((prev) =>
          prev.map((c) => (c._id === updatedCard._id ? updatedCard : c))
        );
        setReviewedToday((prev) =>
          prev.map((c) => (c._id === updatedCard._id ? updatedCard : c))
        );
      } else {
        const res = await API.post("/cards", { ...data, user: userId });
        const newCard = res.data.data;
        setCards((prev) => [newCard, ...prev]);
        setReviewCards((prev) => [newCard, ...prev]);
      }
    } catch (error) {
      console.error("❌ Error saving card:", error.message);
    } finally {
      setIsCardModalOpen(false);
      setCardToEdit(null);
    }
  };

  // ✅ Search + Filter handling
  const handleSearch = (query) => setSearchQuery(query.toLowerCase());
  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  // ✅ Modal controls
  const openCardModal = (card) => setSelectedCard(card);
  const closeCardModal = () => setSelectedCard(null);

  // ✅ View modes
  const showReviewedToday = () => setViewMode("reviewed");
  const showAllCards = () => setViewMode("all");
  const showDefault = () => setViewMode("default");

  if (!userData) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-page">
      {/* 🧭 Navbar with search + filter */}
      <DashboardNavbar
        user={userData}
        onSearch={handleSearch}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      <div className="dashboard-container">
        {/* 📊 Left Side */}
        <div className="dashboard-left">
         

          <ProgressCards
            user={userData}
            reviewedCount={reviewedToday.length}
            allCardsCount={cards.length}
            onClickReviewed={showReviewedToday}
            onClickAllCards={showAllCards}
          />
 <div className="dashboard-actions">
            <button className="btn-add-card" onClick={openCreateCardModal}>
              + New Card
            </button>
          </div>
          {viewMode === "default" && (
            <ReviewQueue
              cards={reviewCards}
              onCardReviewed={handleCardReviewed}
            />
          )}

          {viewMode === "reviewed" && (
            <ReviewedList
              cards={reviewedToday}
              onBack={showDefault}
              onCardClick={openCardModal}
              onDeleteCard={handleDeleteClick}
              onEditCard={openEditCardModal}
              searchQuery={searchQuery}
              filters={filters}
            />
          )}

          {viewMode === "all" && (
            <AllCardsList
              cards={cards}
              onBack={showDefault}
              onCardClick={openCardModal}
              onDeleteCard={handleDeleteClick}
              onEditCard={openEditCardModal}
              searchQuery={searchQuery}
              filters={filters}
            />
          )}
        </div>

        {/* 🗓️ Right Side */}
        <div className="dashboard-right">
          <CalendarSection cards={cards} />
          <UpcomingSection cards={cards} />
        </div>
      </div>

      {/* 🗑️ Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteCard}
      />

      {/* ✏️ Create/Edit Card Modal */}
      <CardFormModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSubmit={handleCardSubmit}
        cardToEdit={cardToEdit}
      />

      {/* 🎯 Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        initialFilters={filters}
      />

      {/* 👁️ Card Details Popup */}
      {selectedCard && <CardModal card={selectedCard} onClose={closeCardModal} />}
    </div>
  );
};

export default Dashboard;
