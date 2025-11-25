import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import ContractABI from './ProductSaleABI';
import { ProviderContext } from './ProviderContext';
import { motion, AnimatePresence } from 'motion/react';
import DecorativeElements from './DecorativeElements';

const ProductItem = ({ product, onPurchase, featured = false }) => {
  const { provider } = useContext(ProviderContext);
  const contractAddress = '0xC598C2A23076De237B489426363C10cf388EeaB7';
  const [txHash, setTxHash] = useState('');
  const [txCompleted, setTxCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const buyProduct = async () => {
    if (!provider) {
      alert("Connetti il tuo wallet per procedere con l'acquisto.");
      return;
    }

    const network = await provider.getNetwork();
    if (network.chainId !== 11155111) {
      alert("Per favore passa alla rete Sepolia Testnet per procedere.");
      return;
    }

    if (product.available <= 0) {
      alert("Questo prodotto non è più disponibile.");
      return;
    }

    setTxHash('');
    setTxCompleted(false);
    setTransactionFailed(false);
    setTransactionInProgress(true);
    setShowModal(true);

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractABI, signer);

      const tx = await contract.buyProduct({ value: ethers.utils.parseEther(product.price) });
      setTxHash(tx.hash);
      console.log(`Transazione inviata. Hash: ${tx.hash}`);

      await tx.wait();

      setTxCompleted(true);
      setTransactionInProgress(false);
      console.log("Acquisto completato!");
      onPurchase(product.id);
    } catch (error) {
      console.error("Errore nell'acquisto del prodotto:", error);
      setTransactionFailed(true);
      setTransactionInProgress(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTxHash('');
    setTxCompleted(false);
    setTransactionFailed(false);
    setTransactionInProgress(false);
  };

  const formatTxHash = (hash) => {
    if (!hash) return "";
    const prefix = hash.slice(0, 6);
    const suffix = hash.slice(-4);
    return (
      <a
        href={`https://sepolia.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange hover:underline"
      >
        {`${prefix}...${suffix}`}
      </a>
    );
  };

  const imageHeight = featured ? 'h-96' : 'h-64';

  return (
    <div className="h-full">
      <div className="card-minimal h-full flex flex-col group">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full ${imageHeight} object-cover transition-transform duration-500 group-hover:scale-105`}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4">
            <DecorativeElements type="badge" text={product.location} variant="default" />
          </div>

          {product.available <= 2 && product.available > 0 && (
            <div className="absolute top-4 right-4">
              <DecorativeElements type="badge" text={`Only ${product.available} left!`} variant="orange" />
            </div>
          )}

          {product.available === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <span className="text-white font-bold text-xl">Sold Out</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="heading-lg flex-1">{product.name}</h3>
            <DecorativeElements type="asterisk" className="ml-2" />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-orange' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{product.duration}</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">{product.price} ETH</span>
            </div>

            <button
              onClick={buyProduct}
              disabled={product.available <= 0}
              className={`w-full ${product.available <= 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed py-3 px-6 rounded-full'
                  : 'btn-primary'
                }`}
            >
              {product.available <= 0 ? 'Sold Out' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
            >
              <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url(${product.imageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display font-bold text-xl">{product.name}</h3>
                  <p>{product.location} • {product.duration}</p>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-display font-semibold text-lg mb-4">Payment Details</h4>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Trip Price</span>
                    <span className="font-semibold">{product.price} ETH</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Network</span>
                    <span className="font-semibold">Sepolia Testnet</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Status</span>
                    {transactionInProgress ? (
                      <span className="flex items-center text-blue-500">
                        <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        In Progress...
                      </span>
                    ) : txCompleted ? (
                      <span className="text-green-500 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Completed
                      </span>
                    ) : transactionFailed ? (
                      <span className="text-red-500 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Failed
                      </span>
                    ) : (
                      <span className="text-gray-500">Waiting</span>
                    )}
                  </div>

                  {txHash && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">TX Hash</span>
                      <span>{formatTxHash(txHash)}</span>
                    </div>
                  )}
                </div>

                {txCompleted && (
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Payment completed successfully!</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your trip has been booked. You will receive details via email.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {transactionFailed && (
                  <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Transaction failed</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>An error occurred during payment. Please try again later or contact support.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-all"
                  >
                    Close
                  </button>

                  {txCompleted && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-black text-white rounded-lg font-medium transition-all hover:bg-gray-800"
                    >
                      View on Etherscan
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductItem;