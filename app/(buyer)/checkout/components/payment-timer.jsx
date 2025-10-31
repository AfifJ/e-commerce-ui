"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, AlertCircle } from "lucide-react";

// Payment Timer Component
export function PaymentTimer({ initialTime = 7200, onExpire, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  // Format time to HH:MM:SS
  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Calculate warning state (less than 30 minutes)
  const isWarning = timeLeft <= 1800 && timeLeft > 0;

  // Calculate danger state (less than 10 minutes)
  const isDanger = timeLeft <= 600 && timeLeft > 0;

  useEffect(() => {
    if (timeLeft <= 0 && !isExpired) {
      setIsExpired(true);
      if (onExpire) {
        onExpire();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExpired, onExpire]);

  if (isExpired) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-red-800">Pembayaran Kadaluarsa</p>
          <p className="text-xs text-red-600">Waktu pembayaran telah habis</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        isDanger
          ? 'bg-red-50 border-red-200'
          : isWarning
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-blue-50 border-blue-200'
      } ${className}`}
    >
      <Clock
        className={`w-4 h-4 flex-shrink-0 ${
          isDanger
            ? 'text-red-600'
            : isWarning
            ? 'text-yellow-600'
            : 'text-blue-600'
        }`}
      />
      <div className="flex-1">
        <p
          className={`text-sm font-medium ${
            isDanger
              ? 'text-red-800'
              : isWarning
              ? 'text-yellow-800'
              : 'text-blue-800'
          }`}
        >
          Sisa Waktu Pembayaran
        </p>
        <p
          className={`text-lg font-bold ${
            isDanger
              ? 'text-red-900'
              : isWarning
              ? 'text-yellow-900'
              : 'text-blue-900'
          }`}
        >
          {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
}

// Compact Timer Component (for smaller spaces)
export function CompactPaymentTimer({ initialTime = 7200, onExpire, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  // Format time to HH:MM:SS
  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Calculate warning state (less than 30 minutes)
  const isWarning = timeLeft <= 1800 && timeLeft > 0;

  // Calculate danger state (less than 10 minutes)
  const isDanger = timeLeft <= 600 && timeLeft > 0;

  useEffect(() => {
    if (timeLeft <= 0 && !isExpired) {
      setIsExpired(true);
      if (onExpire) {
        onExpire();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExpired, onExpire]);

  if (isExpired) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Kadaluarsa</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
    >
      <Clock
        className={`w-4 h-4 ${
          isDanger
            ? 'text-red-600'
            : isWarning
            ? 'text-yellow-600'
            : 'text-gray-600'
        }`}
      />
      <span
        className={`text-sm font-mono font-medium ${
          isDanger
            ? 'text-red-600'
            : isWarning
            ? 'text-yellow-600'
            : 'text-gray-700'
        }`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

// Progress Bar Timer Component
export function ProgressBarTimer({ initialTime = 7200, onExpire, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  // Calculate percentage
  const percentage = (timeLeft / initialTime) * 100;

  // Calculate warning state (less than 30 minutes)
  const isWarning = timeLeft <= 1800 && timeLeft > 0;

  // Calculate danger state (less than 10 minutes)
  const isDanger = timeLeft <= 600 && timeLeft > 0;

  useEffect(() => {
    if (timeLeft <= 0 && !isExpired) {
      setIsExpired(true);
      if (onExpire) {
        onExpire();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExpired, onExpire, initialTime]);

  if (isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm font-medium text-red-600">Pembayaran Kadaluarsa</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Sisa Waktu</span>
        <span
          className={`text-sm font-medium ${
            isDanger
              ? 'text-red-600'
              : isWarning
              ? 'text-yellow-600'
              : 'text-gray-700'
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isDanger
              ? 'bg-red-500'
              : isWarning
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default PaymentTimer;