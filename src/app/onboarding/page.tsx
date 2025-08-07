'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuizData {
  incomeFrequency: string;
  monthlyIncome: number;
  majorExpenses: { name: string; amount: number }[];
  savingsGoal: { type: string; amount: number };
  purchaseAmount: number;
  purchaseDescription: string;
}

export default function OnboardingQuiz() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<QuizData>>({
    majorExpenses: [],
    savingsGoal: { type: '', amount: 0 }
  });
  
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // For now, save to localStorage and show completion
      localStorage.setItem('onboardingData', JSON.stringify(data));
      setStep(6); // Show completion step
    }
  };
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const updateData = (field: string, value: string | number | { name: string; amount: number }[] | { type: string; amount: number }) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateExpense = (expenseName: string, amount: string) => {
    const expenses = data.majorExpenses || [];
    const updated = expenses.filter(exp => exp.name !== expenseName);
    if (amount && parseFloat(amount) > 0) {
      updated.push({ name: expenseName, amount: parseFloat(amount) });
    }
    updateData('majorExpenses', updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        
        {/* Progress Bar */}
        {step <= totalSteps && (
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600 mt-2">
              Step {step} of {totalSteps}
            </div>
          </div>
        )}
        
        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          {/* Step 1: Income Frequency */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Let&apos;s start simple 😊</h2>
              <p className="text-gray-600 mb-6">How do you usually get paid?</p>
              
              <div className="space-y-3">
                {[
                  'Weekly paycheck',
                  'Bi-weekly paycheck',
                  'Monthly salary',
                  'Gig work/varies',
                  'Other'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateData('incomeFrequency', option);
                      handleNext();
                    }}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Income Amount */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">What&apos;s your take-home income?</h2>
              <p className="text-sm text-gray-500 mb-6">(after taxes & deductions)</p>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">💰</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="flex-1 px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => updateData('monthlyIncome', parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-gray-500">per month</span>
                </div>
                
                <p className="text-sm text-blue-600 mb-4">
                  💡 Tip: Use your bank app to check recent deposits
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <button className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                  Connect Bank Account (Coming Soon)
                </button>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext} 
                  disabled={!data.monthlyIncome || data.monthlyIncome <= 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Major Expenses */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">What are your biggest monthly bills?</h2>
              
              <div className="space-y-4 mb-6">
                {[
                  { icon: '🏠', label: 'Rent/Mortgage', key: 'rent' },
                  { icon: '🚗', label: 'Car payment', key: 'car' },
                  { icon: '👶', label: 'Childcare', key: 'childcare' },
                  { icon: '📱', label: 'Phone/Internet', key: 'phone' }
                ].map((expense) => (
                  <div key={expense.key} className="flex items-center space-x-3">
                    <span className="text-xl">{expense.icon}</span>
                    <span className="flex-1">{expense.label}</span>
                    <input
                      type="number"
                      placeholder="$0"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => updateExpense(expense.label, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Savings Goals */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Are you saving for anything right now?</h2>
              
              <div className="space-y-3 mb-6">
                {[
                  'Emergency fund',
                  'Vacation',
                  'Down payment',
                  'Just general savings',
                  'Not saving right now'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateData('savingsGoal', { type: option, amount: data.savingsGoal?.amount || 0 })}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      data.savingsGoal?.type === option
                        ? 'bg-blue-50 border-blue-300'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {data.savingsGoal?.type && data.savingsGoal.type !== 'Not saving right now' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Amount per month:
                  </label>
                  <input
                    type="number"
                    placeholder="$0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                   onChange={(e) => updateData('savingsGoal', {
  type: data.savingsGoal?.type || '',
  amount: parseFloat(e.target.value) || 0
})}
                  />
                </div>
              )}
              
              <div className="flex justify-between">
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 5: The Purchase */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-6">What are you thinking of buying?</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    💭 Purchase amount
                  </label>
                  <input
                    type="number"
                    placeholder="$0"
                    className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => updateData('purchaseAmount', parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What is it? (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., new laptop, vacation, car repair"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => updateData('purchaseDescription', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!data.purchaseAmount || data.purchaseAmount <= 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate My Answer →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 6: Completion */}
          {step === 6 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎉 All set!</h2>
              <p className="text-gray-600 mb-6">
                Your financial information has been saved. The affordability calculator is being built and will give you a clear answer soon!
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">What we collected:</h3>
                <div className="text-sm text-left space-y-1">
                  <div>💰 Income: ${data.monthlyIncome}/month ({data.incomeFrequency})</div>
                  <div>🏠 Expenses: {data.majorExpenses?.length || 0} items</div>
                  <div>🎯 Savings: {data.savingsGoal?.type}</div>
                  <div>🛍️ Purchase: ${data.purchaseAmount} {data.purchaseDescription && `(${data.purchaseDescription})`}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link 
                  href="/"
                  className="inline-block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Back to Home
                </Link>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Try Different Numbers
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
