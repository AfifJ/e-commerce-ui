"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ThumbsUp,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Package,
  CheckCircle
} from "lucide-react";
import { productTabsData } from "@/data/mock-data";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const tabs = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "spesifikasi", label: "Spesifikasi" },
    { id: "ulasan", label: "Ulasan" },
    { id: "faq", label: "FAQ" },
  ];

  // Menggunakan data dari mock-data.js
  const { productDescription, specifications, reviews, faqs } = productTabsData;

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Deskripsi Tab */}
        {activeTab === "deskripsi" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
              <p className="text-gray-700 leading-relaxed">
                {productDescription.mainDescription(product.name)}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Fitur Utama</h4>
              <ul className="space-y-2">
                {productDescription.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Material & Perawatan</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {productDescription.materials}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mt-2">
                  {productDescription.care}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Detail Produk</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><strong>Berat:</strong> {productDescription.weight}</li>
                  <li><strong>Dimensi:</strong> {productDescription.dimensions}</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Isi Paket</h4>
              <ul className="space-y-2">
                {productDescription.packageIncludes.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Spesifikasi Tab */}
        {activeTab === "spesifikasi" && (
          <div className="space-y-6">
            {specifications(product).map((spec, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{spec.category}</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {spec.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                          <td className="py-3 px-4 font-medium text-gray-900 w-1/3">
                            {item.label}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ulasan Tab */}
        {activeTab === "ulasan" && (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                  <div className="flex justify-center my-2">
                    {renderStars(Math.floor(product.rating))}
                  </div>
                  <p className="text-gray-600">{product.reviews} ulasan</p>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Ulasan Pelanggan</h3>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>Paling Relevan</option>
                  <option>Rating Tertinggi</option>
                  <option>Rating Terendah</option>
                  <option>Terbaru</option>
                </select>
              </div>

              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        {review.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {review.text}
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Pertanyaan yang Sering Diajukan</h3>
              <p className="text-gray-600 mt-1">Cari jawaban untuk pertanyaan umum tentang produk ini</p>
            </div>

            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}