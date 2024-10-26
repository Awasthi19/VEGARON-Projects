import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface CustomerSearchProps {
  setSearchResults: (results: any[]) => void;
}

export function CustomerSearch({ setSearchResults }: CustomerSearchProps) {
  const placeholder1 = ["Search by Customer Name"];
  const placeholder2 = ["Search by Customer ID"];

  const [customerNameQuery, setCustomerNameQuery] = useState("");
  const [customerIDQuery, setCustomerIDQuery] = useState("");

  // Function to fetch search suggestions
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SEARCH_URL!, {
        params: {
          customerIDQuery: customerIDQuery,
          customerNameQuery: customerNameQuery,
        },
      });
      console.log("response", response.data);
      setSearchResults(response.data); // Update parent component's state
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Debounced version of the fetchSuggestions function
  const debouncedFetchSuggestions = useCallback(
    debounce(() => {
      if (customerNameQuery || customerIDQuery) {
        fetchSuggestions();
      }
    }, 300),
    [customerNameQuery, customerIDQuery]
  );

  // Trigger debounced function when the inputs change
  useEffect(() => {
    debouncedFetchSuggestions();
    return () => {
      debouncedFetchSuggestions.cancel(); // Cleanup debounce on unmount
    };
  }, [customerNameQuery, customerIDQuery, debouncedFetchSuggestions]);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSuggestions();
  };

  return (
    <div className="form-container dark:bg-custom-dark bg-custom-light">
      <div className="relative z-9 search-form text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light">
        <h2 className="absolute z-10">Search Customer</h2>
        <div className="search-form-group">
          <label htmlFor="customerNameQuery">Customer Name</label>
          <PlaceholdersAndVanishInput
            placeholders={placeholder1}
            onChange={(e) => setCustomerNameQuery(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>
        <div className="search-form-group">
          <label htmlFor="customerID">Customer ID</label>
          <PlaceholdersAndVanishInput
            placeholders={placeholder2}
            onChange={(e) => setCustomerIDQuery(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
