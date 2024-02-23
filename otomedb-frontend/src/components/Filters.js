import React, { useState } from 'react';
import './Filters.css';
import traits from '../../traits.json';

function Filters({ onApplyFilters }) {
    const [filters, setFilters] = useState({
        publishedYear: "",
        mediaType: [],
        femaleLeadTraits: [],
        maleLeadTraits: [],
        miscellaneous: [],
        filter: []
      });
      
    const toggleFilter = (filterCategory, value) => {
        setFilters((prevFilters)=> {
            const isAlreadySelected = prevFilters[filterCategory].includes(value);
            const newFilters = isAlreadySelected
                ? prevFilters[filterCategory].filter((item) => item !== value)
                : [...prevFilters[filterCategory], value];
            
            return { ...prevFilters, [filterCategory] : newFilters};
        });
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onApplyFilters(filters);
      };
    
    const mediaTypeOptions = ["manhwa", "manhua", "kDrama", "novel", "manga"]
    const femaleLeadTraitsOptions = traits.femaleLeadTraits;
    const maleLeadTraitsOptions = traits.maleLeadTraits;
    const miscellaneousOptions = ["action", "chick flick", "comedy", "drama", "fantasy", "harem", "isekai", "love triangle", "politics", "psychological", "revenge", "romance"]
    const filterOptions = ["all ages only", "adult only", "both OK"]
    
    // toggle function for published year
    return (
        <form onSubmit = {handleSubmit}>
            <div className = "filter-section">
                <h2>Published Year</h2>
                <div className = "filter-options">
                    {['2011-2020', '2021+'].map((year) => (
                        <button
                            key={year}
                            type="button"
                            className={`filter-option ${filters.publishedYear === year ? 'active' : ''}`}
                            onClick={() => toggleFilter('publishedYear', year)}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
    
            <div className ="filter-section">
                <h2>Media Type</h2>
                <div className = "filter-options">
                    {mediaTypeOptions.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={`filter-option ${filters.mediaType.includes(type) ? 'active' : ''}`}
                            onClick={() => toggleFilter('mediaType', type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
    
            <div className="filter-section">
                <h2>Female Lead Traits</h2>
                <div className = "filter-options">
                    {femaleLeadTraitsOptions.map((traitF) => (
                        <button
                            key = {traitF}
                            type = "button"
                            className={`filter-option ${filters.femaleLeadTraits.includes(traitF) ? 'active' : ''}`}
                            onClick = {() => toggleFilter('femaleLeadTraits',traitF)}
                            >
                                {traitF}
                            </button>
                    ))}
                </div>
            </div>
    
            <div className="filter-section">
                <h2>Male Lead Traits</h2>
                <div className = "filter-options">
                    {maleLeadTraitsOptions.map((traitM) => (
                        <button
                            key = {traitM}
                            type = "button"
                            className={`filter-option ${filters.maleLeadTraits.includes(traitM) ? 'active' : ''}`}
                            onClick = {() => toggleFilter('maleLeadTraits',traitM)}
                            >
                                {traitM}
                            </button>
                    ))}
                </div>
            </div>
    
            <div className="filter-section">
                <h2>Miscellaneous</h2>
                <div className = "filter-options">
                    {miscellaneousOptions.map((genre) => (
                        <button
                            key = {genre}
                            type = "button"
                            className={`filter-option ${filters.miscellaneous.includes(genre) ? 'active' : ''}`}
                            onClick = {() => toggleFilter('miscellaneous',genre)}
                            >
                                {genre}
                            </button>
                    ))}
                </div>
            </div>
    
            <div className="filter-section">
                <h2>Filter</h2>
                <div className = "filter-options">
                    {filterOptions.map((filt) => (
                        <button
                            key = {filt}
                            type = "button"
                            className={`filter-option ${filters.filter.includes(filt) ? 'active' : ''}`}
                            onClick = {() => toggleFilter('filter',filt)}
                            >
                                {filt}
                            </button>
                    ))}
                </div>
            </div>
            <button type="submit" className = "apply-filters-btn">Apply Filters</button>
        </form>
    );
}

export default Filters;