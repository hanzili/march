"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../lib/constants/urls"
import { useAuth } from "../../contexts/AuthContext"
import { Item } from "../../lib/@types/Items/Item"
import { useSpace } from "../../hooks/useSpace"

const SearchComponent = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { session } = useAuth()
  const spaces = useSpace()
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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.length > 0) {
      setIsLoading(true)
      setSearchResults([])
      try {
        const response = await axios.get(`${BACKEND_URL}/api/items/search?q=${e.target.value}`, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        setSearchResults(response.data.items)
      } catch (error) {
        console.error("Error searching items:", error)
        // Optionally set an error state here
      } finally {
        setIsLoading(false)
      }
    } else {
      setSearchResults([])
    }
  }

  return (
    <div>
      {isSearchVisible && (
        <div className="fixed inset-0 z-50"> {/* Added z-50 for highest priority */}
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          {/* Search bar modal */}
          <div className="absolute inset-0 flex flex-col items-center">
            <div className="search-bar bg-background text-foreground w-1/2 rounded-lg border border-secondary-foreground overflow-hidden mt-[20vh] relative z-10"> {/* Added z-10 to ensure it's above the blur */}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-4 bg-background text-foreground focus:outline-none text-lg"
                  autoFocus
                />
                <span className="absolute right-4 text-secondary-foreground text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  press ↵ to go to
                </span>
              </div>
              {/* Separator line */}
              <div className="border-t border-secondary-foreground"></div>
              {isLoading ? (
                <div className="p-4 text-secondary-foreground">
                  Searching...
                </div>
              ) : searchTerm.length > 0 && searchResults.length === 0 ? (
                <div className="p-4 text-secondary-foreground">
                  Nothing found.
                </div>
              ) : (
                <ul>
                  {searchResults.map((result) => (
                    <li
                      key={result._id}
                      className="flex items-center p-4 hover:bg-secondary/10"
                    >
                      <div className="flex-grow">
                        <div className="text-foreground">{result.title}</div>
                        <div className="text-secondary-foreground text-sm">{result.description}</div>
                      </div>
                      {result.spaces.length > 0 && spaces && (
                        <div className="text-secondary-foreground text-xs">
                          {spaces[result.spaces[0]]?.name || 'Unknown Space'}
                        </div>
                      )}
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
