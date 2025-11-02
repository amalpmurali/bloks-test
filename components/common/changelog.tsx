"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Types for the changelog items
export interface ChangelogItem {
  version: string;
  versionSubtext?: string;
  date: string;
  title: string;
  description: string;
  featureImages?: {
    url: string;
    caption?: string;
  }[];
  contributors?: {
    name: string;
    avatar: string;
  }[];
  changes: {
    type: "added" | "changed" | "fixed" | "removed";
    items: string[];
  }[];
  isHighlighted?: boolean;
}

interface ChangelogProps {
  items: ChangelogItem[];
  className?: string;
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: Array<number | "All">;
}

// Feature Images Carousel Component
function FeatureImagesCarousel({
  images,
  title,
}: {
  images: ChangelogItem["featureImages"];
  title: string;
}) {
  // Need to ensure we have images
  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      {/* Simple Horizontal Scroll for Images */}
      <ScrollArea className="w-full h-[200px]">
        <div className="flex space-x-3 py-2 px-1">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 relative overflow-hidden rounded-md"
              style={{ width: "280px", height: "180px" }}
            >
              <div className="absolute inset-0 border-2 border-black z-10"></div>
              <img
                src={image.url}
                alt={image.caption || `Screenshot ${idx + 1} for ${title}`}
                className="w-full h-full object-cover"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs font-mono">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export function Changelog({
  items,
  className,
  defaultItemsPerPage = 3,
  itemsPerPageOptions = [3, 5, 10, "All"],
}: ChangelogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | "All">(
    defaultItemsPerPage
  );
  const [showingItems, setShowingItems] = useState<{
    start: number;
    end: number;
  }>({ start: 1, end: Math.min(defaultItemsPerPage, items.length) });

  // Calculate total pages and adjust current page if needed
  const adjustedItemsPerPage =
    itemsPerPage === "All" ? items.length : itemsPerPage;
  const totalPages = Math.ceil(
    items.length /
      (typeof adjustedItemsPerPage === "number"
        ? adjustedItemsPerPage
        : items.length)
  );

  // Adjust page if current page is now out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  // Get current items for this page
  const indexOfLastItem = currentPage * adjustedItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - adjustedItemsPerPage;
  const currentItems = items.slice(
    indexOfFirstItem,
    Math.min(indexOfLastItem, items.length)
  );

  // Update showing items count
  React.useEffect(() => {
    if (items.length === 0) {
      setShowingItems({ start: 0, end: 0 });
    } else {
      setShowingItems({
        start: indexOfFirstItem + 1,
        end: Math.min(indexOfLastItem, items.length),
      });
    }
  }, [currentPage, items.length, indexOfFirstItem, indexOfLastItem]);

  // Page navigation functions
  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Handle items per page change
  const handleItemsPerPageChange = (newValue: typeof itemsPerPage) => {
    setItemsPerPage(newValue);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[140px] top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {currentItems.map((item, index) => (
          <div key={index} className="relative mb-16 last:mb-0">
            {/* Date and version on the left */}
            <div className="absolute left-0 top-0 w-[140px] pr-4 text-right">
              <div className="font-mono text-sm text-red-500 font-bold whitespace-nowrap pr-1">
                {item.date}
              </div>
              <div className="font-mono text-xs font-bold mt-1.5 text-blue-600">
                {item.version}
              </div>
              {item.versionSubtext && (
                <div className="font-mono text-[10px] text-gray-500 mt-0.5 max-w-[120px] text-right ml-auto">
                  {item.versionSubtext}
                </div>
              )}
            </div>

            {/* Version bullet point */}
            <div
              className={cn(
                "absolute left-[136px] top-1 w-[9px] h-[9px] z-10",
                item.isHighlighted
                  ? "bg-yellow-400 outline outline-1 outline-black"
                  : "bg-black"
              )}
            ></div>

            {/* Content container */}
            <div className="ml-[180px] relative mt-8 max-w-2xl">
              {/* Brutalist design elements */}
              <div className="absolute -left-2 -top-2 w-6 h-6 bg-yellow-400 z-0"></div>
              <div className="absolute -right-2 -bottom-2 w-6 h-6 bg-blue-500 z-0"></div>

              {/* Content with designed border */}
              <div className="border-2 border-black bg-white p-4 relative z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-3">
                  <h3 className="font-mono text-xl font-bold">
                    <span className="relative inline-block">
                      {item.title}
                      {item.isHighlighted && (
                        <div className="absolute -left-1 -bottom-1 w-full h-1.5 bg-yellow-400 z-0"></div>
                      )}
                    </span>
                  </h3>
                </div>
                <p className="mb-4 text-gray-700">{item.description}</p>

                {/* Feature Images Story Carousel */}
                {item.featureImages && item.featureImages.length > 0 && (
                  <div className="mb-5 relative">
                    {/* Carousel with ScrollArea */}
                    <div className="relative">
                      <FeatureImagesCarousel
                        images={item.featureImages}
                        title={item.title}
                      />
                    </div>
                  </div>
                )}

                {/* Changes */}
                <div>
                  {item.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="mb-4">
                      {change.type === "added" && (
                        <div className="font-mono font-semibold mb-1">
                          Code:
                        </div>
                      )}
                      {change.type === "changed" && (
                        <div className="font-mono font-semibold mb-1">
                          Figma:
                        </div>
                      )}
                      {change.type === "fixed" && (
                        <div className="font-mono font-semibold mb-1">
                          Fixed:
                        </div>
                      )}
                      {change.type === "removed" && (
                        <div className="font-mono font-semibold mb-1">
                          Removed:
                        </div>
                      )}
                      <ul className="list-disc ml-5 space-y-1.5">
                        {change.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm">
                            <span className="font-mono font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Contributors */}
                {item.contributors && item.contributors.length > 0 && (
                  <div className="mt-6 pt-4 border-t-2 border-gray-200 flex items-center">
                    <span className="font-mono text-xs mr-2">
                      Contributors:
                    </span>
                    <div className="flex -space-x-2">
                      {item.contributors.map((contributor, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                          title={contributor.name}
                        >
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Controls and Page Size Selector */}
        {items.length > 0 && (
          <div className="border-2 border-black bg-white p-4 ml-[180px] relative mt-10 max-w-2xl">
            {/* Brutalist design elements */}
            <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-400 z-0"></div>
            <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-yellow-400 z-0"></div>
            <div className="relative z-10">
              {/* Pagination summary */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="font-mono text-sm">
                  Showing{" "}
                  <span className="font-bold">
                    {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, items.length)}
                  </span>{" "}
                  of <span className="font-bold">{items.length}</span> entries
                </div>

                {/* Items per page selector */}
                <div className="flex items-center">
                  <span className="font-mono text-sm mr-2">Show:</span>
                  <div className="flex border-2 border-black overflow-hidden">
                    {itemsPerPageOptions.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleItemsPerPageChange(option)}
                        className={cn(
                          "px-2 py-1 font-mono text-sm",
                          itemsPerPage === option
                            ? "bg-black text-white"
                            : "bg-white hover:bg-gray-100 border-r-2 border-black last:border-r-0"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={cn(
                      "px-3 py-1 border-2 border-black font-mono text-sm relative",
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                    )}
                    aria-label="Previous page"
                  >
                    ← Previous
                  </button>

                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={cn(
                            "w-8 h-8 flex items-center justify-center font-mono text-sm border-2 border-black",
                            currentPage === pageNum
                              ? "bg-black text-white"
                              : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                          )}
                          aria-label={`Go to page ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={cn(
                      "px-3 py-1 border-2 border-black font-mono text-sm relative",
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                    )}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
