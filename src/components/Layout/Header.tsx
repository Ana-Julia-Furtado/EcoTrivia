"use client"

import type React from "react"
import { useState } from "react"
import { Leaf, User, Settings, LogOut, Hash, Menu, X } from "lucide-react"
import { useGameStore } from "../../store/gameStore"

export const Header: React.FC = () => {
  const { currentUser, logout } = useGameStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-gradient-nature shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="bg-white/20 p-2 rounded-full">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-white">EcoTrivia</h1>
              <p className="text-xs sm:text-sm text-green-100">Jogo de Sustentabilidade Ambiental</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white">EcoTrivia</h1>
            </div>
          </div>

          {currentUser && (
            <>
              {/* Desktop User Info */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2">
                  <User className="h-5 w-5 text-white" />
                  <div className="text-left">
                    <span className="text-white font-medium block">{currentUser.name}</span>
                    <div className="flex items-center space-x-2 text-green-200 text-xs">
                      <Hash className="h-3 w-3" />
                      <span>RA: {currentUser.id}</span>
                      <span>•</span>
                      <span>Nível {currentUser.level}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Menu"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {currentUser && isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-nature border-t border-white/20 shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              {/* User Info Mobile */}
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
                <User className="h-6 w-6 text-white flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{currentUser.name}</p>
                  <div className="flex items-center space-x-2 text-green-200 text-sm mt-1">
                    <Hash className="h-3 w-3" />
                    <span>RA: {currentUser.id}</span>
                    <span>•</span>
                    <span>Nível {currentUser.level}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </button>

                <button
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  )
}
