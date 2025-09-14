'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterOptions, Industry, TechStack, RevenueModel } from '@/lib/types';
import { INDUSTRIES, TECH_STACKS, REVENUE_MODELS } from '@/lib/constants';
import { CategoryTag } from './CategoryTag';

interface FilterDropdownProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterDropdown({ filters, onFiltersChange, className }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === filters[key] ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 transition-all duration-200 hover:bg-gray-50',
          isOpen && 'ring-2 ring-blue-600 ring-offset-2'
        )}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slide-up">
          <div className="p-4 space-y-4">
            {/* Industry Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Industry</h4>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map(({ value, label }) => (
                  <CategoryTag
                    key={value}
                    variant={filters.industry === value ? 'active' : 'default'}
                    onClick={() => handleFilterChange('industry', value)}
                  >
                    {label}
                  </CategoryTag>
                ))}
              </div>
            </div>

            {/* Tech Stack Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {TECH_STACKS.map(({ value, label }) => (
                  <CategoryTag
                    key={value}
                    variant={filters.techStack === value ? 'active' : 'default'}
                    onClick={() => handleFilterChange('techStack', value)}
                  >
                    {label}
                  </CategoryTag>
                ))}
              </div>
            </div>

            {/* Revenue Model Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Revenue Model</h4>
              <div className="flex flex-wrap gap-2">
                {REVENUE_MODELS.map(({ value, label }) => (
                  <CategoryTag
                    key={value}
                    variant={filters.revenueModel === value ? 'active' : 'default'}
                    onClick={() => handleFilterChange('revenueModel', value)}
                  >
                    {label}
                  </CategoryTag>
                ))}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
