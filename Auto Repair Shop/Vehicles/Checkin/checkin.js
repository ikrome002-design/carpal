import React, { useState } from 'react';
import { Check, ChevronRight, Upload, X, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VehicleCheckinFlow = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    vin: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    currentMileage: '',
    serviceType: '',
    exteriorCondition: '',
    interiorCondition: '',
    components: {
      audio: { condition: '', notes: '' },
      interior: { condition: '', notes: '' },
      carpets: { condition: '', notes: '' },
      exterior: { condition: '', notes: '' },
      engine: { condition: '', notes: '' }
    },
    payee: {
      type: '',
      name: '',
      contact: '',
      id: ''
    },
    checkin: {
      date: '',
      time: '',
      instructions: '',
      termsAccepted: false
    },
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleComponentChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [category]: {
          ...prev.components[category],
          [field]: value
        }
      }
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!vehicleType) newErrors.type = 'Please select a vehicle type';
        break;
      case 2:
        if (!formData.make) newErrors.make = 'Make is required';
        if (!formData.model) newErrors.model = 'Model is required';
        break;
      // Add validation for other steps
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setVehicleType('new')}
                className={`p-6 rounded-lg border-2 ${
                  vehicleType === 'new' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-medium">New Vehicle</h3>
                <p className="text-sm text-gray-600">First time check-in</p>
              </button>
              <button
                onClick={() => setVehicleType('existing')}
                className={`p-6 rounded-lg border-2 ${
                  vehicleType === 'existing' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-medium">Existing Vehicle</h3>
                <p className="text-sm text-gray-600">Already in system</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Make</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        );

      // Component assessment step
      case 5:
        return (
          <div className="space-y-6">
            {Object.entries(formData.components).map(([category, data]) => (
              <div key={category} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 capitalize">{category}</h4>
                <select
                  value={data.condition}
                  onChange={(e) => handleComponentChange(category, 'condition', e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <textarea
                  value={data.notes}
                  onChange={(e) => handleComponentChange(category, 'notes', e.target.value)}
                  placeholder="Notes..."
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        );

      // Final step
      case 8:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Check-in Date</label>
              <input
                type="date"
                name="checkin.date"
                value={formData.checkin.date}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Special Instructions</label>
              <textarea
                name="checkin.instructions"
                value={formData.checkin.instructions}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border rounded-md"
                rows="3"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="checkin.termsAccepted"
                checked={formData.checkin.termsAccepted}
                onChange={(e) => handleInputChange({
                  target: {
                    name: 'checkin.termsAccepted',
                    value: e.target.checked
                  }
                })}
                className="h-4 w-4 text-yellow-400 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                I accept the terms and conditions
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Vehicle Check-in
            <span className="ml-2 text-sm font-normal text-gray-500">
              Step {step} of 8
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`flex items-center ${
                    i < step ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      i < step
                        ? 'border-yellow-400 bg-yellow-400 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  {i < 7 && (
                    <div
                      className={`w-full h-1 ${
                        i < step - 1 ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-96">
            {renderStepContent()}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              className={`px-4 py-2 rounded-md ${
                step === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (validateStep()) {
                  setStep(prev => Math.min(8, prev + 1));
                }
              }}
              className="px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-500"
            >
              {step === 8 ? 'Complete Check-in' : 'Next'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleCheckinFlow;