import React, { useState } from "react";
import { ethers } from "ethers";
import ERC20 from "../../artifacts/contracts/ERC20.sol/ERC20.json"; // Replace with the actual path to your ERC20 ABI

const Index = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [amountToApprove, setAmountToApprove] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const approveERC20 = async () => {
    setLoading(true);
    setStatusMessage("Approving...✋");

    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          ERC20.abi,
          signer
        );
        const tx = await contract.approve(recipientAddress, amountToApprove);
        await tx.wait();
        setLoading(false);
        setStatusMessage("Tokens approved successfully!🤟🙌");
        console.log("Tokens approved successfully!");
      } catch (error) {
        setLoading(false);
        setStatusMessage("Error approving tokens🔴");
        console.error("Error approving tokens:", error);
      }
    } else {
      setLoading(false);
      setStatusMessage(
        "Ethereum provider not available. Please install Metamask."
      );
      console.error(
        "Ethereum provider not available. Please install Metamask."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Token Approval</h2>
      <div className="mb-4">
        <label className="block font-semibold text-white">Token Address 🪙:</label>
        <input
          className="w-full border border-gray-400 rounded px-4 py-2 bg-gray-800 text-white"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter Token address"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-white">
          Amount to Approve 💰:
        </label>
        <input
          className="w-full border border-gray-400 rounded px-4 py-2 bg-gray-800 text-white"
          type="number"
          value={amountToApprove}
          onChange={(e) => setAmountToApprove(e.target.value)}
          placeholder="Enter amount to approve"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-white">
          Address To Approve🪪 📝:
        </label>
        <input
          className="w-full border border-gray-400 rounded px-4 py-2 bg-gray-800 text-white"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Address to approve"
        />
      </div>
      <button
        className="bg-blue-500 text-black font-semibold py-2 px-4 rounded"
        onClick={approveERC20}
        disabled={loading}
      >
        {loading ? "Approving...✋" : "Approve Tokens"}
      </button>
      {statusMessage && <div className="mt-2">{statusMessage}</div>}
    </div>
  );
};

export default Index;
