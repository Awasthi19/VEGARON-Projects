"use client";
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';


const FormPage = () => {
  const params = useParams();
  const form = params.id;

  const renderForm = () => {
    switch (form) {
  
      case 'CancelTransaction':
        const CancelTransactionForm = dynamic(() => import('@/components/CancelTransactionForm'));
        return <CancelTransactionForm />;
      case 'MasikBilling':
        const MasikBillingForm = dynamic(() => import('@/components/MasikBillingForm'));
        return <MasikBillingForm />;
      case 'MeterReading':
          const MeterReadingForm = dynamic(() => import('@/components/MeterReadingForm'));
          return <MeterReadingForm />;
      case 'Statement':
          const StatementForm = dynamic(() => import('@/components/StatementForm'));
          return <StatementForm />;
      case 'LoadMeterReading':
        const LoadMeterReadingForm = dynamic(() => import('@/components/LoadMeterReadingForm'));
        return <LoadMeterReadingForm />;
      // Add more cases for other forms as needed...
      default:
        return <div>Form not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="main p-8">
        <div>
          {renderForm()}
        </div>
      </main>
    </div>
  );
};

export default FormPage;
