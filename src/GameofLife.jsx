import { useState, useEffect } from "react";
import manImage from "/src/assets/man.png"; 
import luxuryTravel from "/src/assets/luxury-travel.png";
import newCar from "/src/assets/new-car.jpg";
import latestGadgets from "/src/assets/latest-gadgets.jpg";
import weddingHoneymoon from "/src/assets/wedding-honeymoon.webp";
import wedding from "/src/assets/wedding.jpg";
import luxuryApartment from "/src/assets/luxury-apartment.jpg";
import designerClothes from "/src/assets/designer-clothes.png";
import privateSchool from "/src/assets/private-school.jpg";
import exoticCar from "/src/assets/exotic-car.png";
import homeRenovation from "/src/assets/home-renovation.jpg";
import vacationHome from "/src/assets/vacation-home.jpg";
import worldTour from "/src/assets/world-tour.jpeg";
import golfClub from "/src/assets/golf.jpg";
import luxuryRetirement from "/src/assets/luxury-retirement.webp";
import grandkidsCollege from "/src/assets/grandkids-college.jpg";
import yacht from "/src/assets/yacht.webp";


const spendingOptions = {
  20: [
    { name: "Florida Vacation", imgSrc: luxuryTravel, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Nice Car", imgSrc: newCar, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Gaming PC", imgSrc: latestGadgets, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false }
  ],
  30: [
    { 
      name: "Get Married", 
      imgSrc: [weddingHoneymoon, wedding], 
      position: [
        { bottom: "0", right: "35%" },
        { bottom: "0", right: "15%" }
      ], 
      mobilePosition: [
        { bottom: "0%", left: "60%" },
        { bottom: "0%", right: "-40%" }
      ], 
      size: ["78px", "600px"], 
      mobileSize: ["78px", "600px"], 
      zIndex: [999, 1], 
      persistent: false 
    },
    { name: "Luxury Apartment", imgSrc: luxuryApartment, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Designer Clothes", imgSrc: designerClothes, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false }
  ],
  40: [
    { name: "Private School for Kids", imgSrc: privateSchool, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Exotic Car", imgSrc: exoticCar, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Home Renovation", imgSrc: homeRenovation, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false }
  ],
  50: [
    { name: "Vacation Home", imgSrc: vacationHome, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "World Tour", imgSrc: worldTour, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Golf Club Membership", imgSrc: golfClub, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false }
  ],
  60: [
    { name: "Classic Car", imgSrc: luxuryRetirement, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Helping Grandkids with College", imgSrc: grandkidsCollege, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false },
    { name: "Yacht", imgSrc: yacht, position: { bottom: "0", right: "21%" }, mobilePosition: { bottom: "0%", left: "0%" }, size: "600px", mobileSize: "600px", zIndex: 1, persistent: false }
  ]
};


const calculateDecadeGrowth = (principal, decades) => {
  return principal * Math.pow(1.1, decades * 10);
};

export default function GameOfLife() {
  const [round, setRound] = useState(0);
  const [wealth, setWealth] = useState(10_000);
  const [savings, setSavings] = useState(0); 
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [allPurchases, setAllPurchases] = useState([]);
  const [clickCount, setClickCount] = useState(0); 
  const [investments, setInvestments] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rounds = [20, 30, 40, 50, 60];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleChoice = (choice, item) => {
    if (clickCount >= 5) return;

    const incomeThisRound = 10_000;
    let newInvestments = [...investments];
    let newSavings = savings;
    let newPurchases = purchasedItems.filter(i => i.persistent);
    let newAllPurchases = [...allPurchases];

    if (choice === "invest") {
      newInvestments.push({
        decade: round,
        amount: incomeThisRound
      });
    } else if (choice === "save") {
      newSavings += incomeThisRound;
    } else if (choice === "spend") {
      newPurchases.push(item);
      newAllPurchases.push({...item, age: rounds[round]});
    }

    let newWealth = 0;

    newInvestments.forEach(investment => {
      const decadesGrowing = round + 1 - investment.decade;
      newWealth += calculateDecadeGrowth(investment.amount, decadesGrowing);
    });

    newWealth += newSavings;

    if (round < 4 && choice !== "invest") {
  newWealth += 10_000;
}

    newWealth = Math.round(newWealth);

    setWealth(newWealth);
    setSavings(newSavings);
    setPurchasedItems(newPurchases);
    setAllPurchases(newAllPurchases);
    setInvestments(newInvestments);
    setClickCount(clickCount + 1);

    if (round < 4) {
      setRound(round + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setRound(0);
    setWealth(10_000);
    setSavings(0);
    setPurchasedItems([]);
    setAllPurchases([]);
    setClickCount(0);
    setInvestments([]);
    setGameEnded(false);
  };

  return (
    <div className="game-container">
      {clickCount === 0 && (
        <>
          <h1>The Game Of Life</h1>
          <h4>You will receive $10,000 per decade in extra money. Decide how to spend your money each decade until age 70</h4>
        </>
      )}

      {!gameEnded ? (
        <div className="card">
          <h2>Total Wealth: ${wealth.toLocaleString()}</h2>
          <h2>Age {rounds[round]}</h2>
          <p>You have $10,000 to allocate every decade</p>
          <div className="choices">
            <button onClick={() => handleChoice("invest")} disabled={clickCount >= 5}>
              Invest
            </button>
            <button onClick={() => handleChoice("save")} disabled={clickCount >= 5}>
              Save
            </button>
            {spendingOptions[rounds[round]].map((option, index) => (
              <button key={index} onClick={() => handleChoice("spend", option)} disabled={clickCount >= 5}>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card end-card">
          <h2>Game Over - Life Complete!</h2>
          <p>You accumulated <strong>${wealth.toLocaleString()}</strong> by age 70</p>
          <p>Wealth from Investments: ${Math.round(wealth - savings).toLocaleString()}</p>
          <p>Wealth from Savings: ${savings.toLocaleString()}</p>
          {allPurchases.length > 0 ? (
            <div>
              <p><strong>Your Life Purchases:</strong></p>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {allPurchases.map((item, index) => (
                  <li key={index}>Age {item.age}: {item.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Purchases: None</p>
          )}
          <p><strong>Percentage of total possible wealth: {Math.round((wealth / 1_894_208) * 100)}%</strong></p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      <div className="character-container">
        <img 
          src={manImage} 
          alt="Player Character" 
          className="character" 
          style={{ 
            zIndex: 2, 
            position: 'absolute', 
            bottom: '0px', 
            left: '50%', 
            transform: 'translateX(-50%)'
          }} 
        />

        {purchasedItems.map((item, index) => (
          Array.isArray(item.imgSrc) ? (
            item.imgSrc.map((src, i) => (
              <img 
                key={`${index}-${i}`}
                src={src} 
                alt={`${item.name} ${i + 1}`} 
                className="purchase" 
                style={{ 
                  ...(isMobile ? item.mobilePosition[i] : item.position[i]), 
                  width: isMobile ? item.mobileSize[i] : item.size[i], 
                  zIndex: item.zIndex[i] || 1, 
                  position: 'absolute' 
                }} 
              />
            ))
          ) : (
            <img 
              key={index} 
              src={item.imgSrc} 
              alt={item.name} 
              className="purchase" 
              style={{ 
                ...(isMobile ? item.mobilePosition : item.position), 
                width: isMobile ? item.mobileSize : item.size, 
                zIndex: item.zIndex || 1, 
                position: 'absolute' 
              }} 
            />
          )
        ))}
      </div>
    </div>
  );
}