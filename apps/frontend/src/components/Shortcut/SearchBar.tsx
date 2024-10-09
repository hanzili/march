"use client"
import React, { useState, useEffect } from "react"

interface Item {
  title: string
}

const SearchComponent = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "s") {
        event.preventDefault()
        setIsSearchVisible(!isSearchVisible) // Toggle search bar
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as Element).closest(".search-bar") === null) {
        setIsSearchVisible(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isSearchVisible])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length > 0) {
      setIsLoading(true)
      setSearchResults([])
      setTimeout(() => {
        const simulatedResults =
          "meeting".includes(e.target.value.toLowerCase())
            ? [
                { title: "Send a summary of the meeting to..." },
                { title: "demo of meeting" },
              ]
            : []

        setSearchResults(simulatedResults)
        setIsLoading(false)
      }, 1000)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div>
      {isSearchVisible && (
        <div>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-70"></div>

          {/* Search bar modal */}
          <div className="fixed inset-0 flex flex-col items-center">
            <div className="search-bar bg-background text-foreground w-1/2 p-4 rounded-lg mt-[10%]">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 bg-background text-foreground rounded-lg focus:outline-none text-lg"
                autoFocus
              />
              {isLoading ? (
                <div className="text-secondary-foreground mt-4">
                  Searching...
                </div>
              ) : searchTerm.length > 0 && searchResults.length === 0 ? (
                <div className="text-secondary-foreground mt-4">
                  Nothing found.
                </div>
              ) : (
                <ul>
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 mt-4 rounded-lg"
                    >
                      <input type="checkbox" className="mr-3" />
                      {result.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchComponent
