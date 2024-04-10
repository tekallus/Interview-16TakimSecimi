import React, { useState } from "react";

function App() {
  const PLAYERS = [
    "Ali",
    "Namık",
    "Eda",
    "Ebru",
    "Suzan",
    "Samet",
    "Engin",
    "Halit"
  ];
// FormTeams bileşenini çağırırken oyuncuları prop olarak geçiriyoruz
  return <FormTeams players={PLAYERS} />;
}


const FormTeams = ({ players }) => {
  // Takım state'leri ve seçilen takımın durumu
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1);

  
  // Üç state variable'ı yönetmek için useState hook'u kullanılır:
  // - `team1`: Takım 1'deki oyuncuları saklamak için bir dizi.
  // - `team2`: Takım 2'deki oyuncuları saklamak için bir dizi.
  // - `selectedTeam`: Seçili takım numarasını (1 veya 2) gösteren bir tamsayı.

// Oyuncu tıklama işlemi
const handlePlayerClick = (player) => {
  if (team1.includes(player)) {
    // Eğer oyuncu takım 1'de ise, takım 1'den kaldır
    setTeam1(team1.filter((name) => name !== player));
  } else if (team2.includes(player)) {
    // Eğer oyuncu takım 2'de ise, takım 2'den kaldır
    setTeam2(team2.filter((name) => name !== player));
  } else {
    // Eğer oyuncu hiçbir takımda değilse, seçili takıma ekle
    if (selectedTeam === 1) {
      setTeam1([...team1, player]);
    } else {
      setTeam2([...team2, player]);
    }
  }
};

   // Oyuncu seçimiyle ilgilenen `handlePlayerClick` adında bir fonksiyon tanımlar:
  // - Oyuncunun her iki takımda da olup olmadığını kontrol eder.
  // - Herhangi bir takımda değilse, oyuncuyu seçili takıma ekler.
  // - `setTeam1` veya `setTeam2` kullanarak state'i günceller.

 // Takım seçme işlemi
  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };

 // Verilen takım numarasına (1 veya 2) göre `selectedTeam` state'ini günceller.

  const handleShuffle = () => {
    // Oyuncuları karıştır
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    // Takımları sıfırla
    setTeam1([]);
    setTeam2([]);
    // Oyuncuları sıralı şekilde takımlara ekle
    shuffledPlayers.forEach((player, index) => {
      index % 2 === 0
        ? setTeam1((prevTeam1) => [...prevTeam1, player])
        : setTeam2((prevTeam2) => [...prevTeam2, player]);
    });
  };

  // Oyuncu listesini karıştıran, her iki takımı da temizleyen ve ardından
  // oyuncuları dönüşümlü olarak Takım 1 ve Takım 2'ye atayan `handleShuffle` adında bir fonksiyon tanımlar.

    // Sıfırlama işlemi
  const handleReset = () => {
    setTeam1([]);
    setTeam2([]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-center">
        {players.map((player) => (
          !team1.includes(player) && !team2.includes(player) && (
            <span
              key={player}
              onClick={() => handlePlayerClick(player)}
              className="rounded-full px-4 py-2 bg-blue-500 text-white mr-4 mb-4 cursor-pointer"
            >
              {player}
            </span>
          )
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleTeamSelection(1)}
          className={`px-4 py-2 bg-green-500 text-white rounded mr-2 ${
            selectedTeam === 1 ? "bg-green-700" : ""
          }`}
        >
          Şu anda Takım 1 için seçim yapılıyor
        </button>
        <button
          onClick={() => handleTeamSelection(2)}
          className={`px-4 py-2 bg-yellow-500 text-white rounded ${
            selectedTeam === 2 ? "bg-yellow-700" : ""
          }`}
        >
          Şu anda Takım 2 için seçim yapılıyor
        </button>
      </div>
      <div className="mt-8">
        <div className="flex justify-center">
          <div className="w-1/2">
            <h2 className="text-center text-lg font-bold mb-4">Takım 1</h2>
            <ul>
              {team1.map((player, index) => (
                <li key={index} className="mb-2">
                  {player}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2">
            <h2 className="text-center text-lg font-bold mb-4">Takım 2</h2>
            <ul>
              {team2.map((player, index) => (
                <li key={index} className="mb-2">
                  {player}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleShuffle}
          className="px-4 py-2 bg-purple-500 text-white rounded mr-2"
        >
          Karıştır
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
};

export default App;
