
// 자낳대 스타일 LOL 경매 시스템 (닉네임 + 공용 비밀번호 방식)

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const DUMMY_PASSWORD = "qlalfqjsgh2025!";

const dummyPlayers = [
  { name: "Bang", role: "ADC", tier: "Platinum II" },
  { name: "Gori", role: "Mid", tier: "Diamond I" },
  { name: "Tarzan", role: "Jungle", tier: "Challenger" },
  { name: "Effort", role: "Support", tier: "Master" },
  { name: "Morgan", role: "Top", tier: "Diamond III" },
];

const INITIAL_BUDGET = 10000;

export default function DraftAuction() {
  const [step, setStep] = useState("login");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [bids, setBids] = useState([]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

  const handleLogin = () => {
    if (password === DUMMY_PASSWORD && nickname.trim() !== "") {
      setStep("auction");
    } else {
      alert("비밀번호가 틀렸거나 닉네임을 입력하지 않았습니다.");
    }
  };

  const currentPlayer = dummyPlayers[currentPlayerIdx];

  const placeBid = (amount) => {
    if (amount > budget) return alert("예산 초과입니다!");
    const newBid = {
      bidder: nickname,
      player: currentPlayer.name,
      amount,
    };
    setBids([...bids, newBid]);
    setBudget(budget - amount);
    setCurrentPlayerIdx((prev) => (prev + 1) % dummyPlayers.length);
  };

  if (step === "login") {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">LOL 드래프트 경매 입장</h2>
        <Input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} className="mb-2" />
        <Input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
        <Button onClick={handleLogin}>입장하기</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">경매 진행 중: {currentPlayer.name}</h2>
      <Card>
        <CardContent className="p-4">
          <p><strong>포지션:</strong> {currentPlayer.role}</p>
          <p><strong>티어:</strong> {currentPlayer.tier}</p>
        </CardContent>
      </Card>
      <div>
        <p className="mb-2">💰 남은 예산: {budget.toLocaleString()}P</p>
        <div className="flex gap-2">
          {[500, 1000, 2000, 5000].map((amt) => (
            <Button key={amt} onClick={() => placeBid(amt)}>
              {amt.toLocaleString()}P 입찰
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-6">📜 입찰 기록</h3>
        {bids.slice(-5).map((bid, i) => (
          <motion.div key={i} className="border-b py-1">
            {bid.bidder}님이 {bid.player}에게 {bid.amount.toLocaleString()}P 입찰함
          </motion.div>
        ))}
      </div>
    </div>
  );
}
