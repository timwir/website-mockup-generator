'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function DebugPage() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [isSelecting, setIsSelecting] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [endPos, setEndPos] = useState({ x: 0, y: 0 })
  const [selection, setSelection] = useState<{ x: number, y: number, width: number, height: number } | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = 4165 / rect.width // Original image width / displayed width
    const scaleY = 4165 / rect.height // Original image height / displayed height
    
    const x = Math.round((e.clientX - rect.left) * scaleX)
    const y = Math.round((e.clientY - rect.top) * scaleY)
    
    setCoordinates({ x, y })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = 4165 / rect.width
    const scaleY = 4165 / rect.height
    
    const x = Math.round((e.clientX - rect.left) * scaleX)
    const y = Math.round((e.clientY - rect.top) * scaleY)
    
    setIsSelecting(true)
    setStartPos({ x, y })
    setEndPos({ x, y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isSelecting || !imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = 4165 / rect.width
    const scaleY = 4165 / rect.height
    
    const x = Math.round((e.clientX - rect.left) * scaleX)
    const y = Math.round((e.clientY - rect.top) * scaleY)
    
    setEndPos({ x, y })
  }

  const handleMouseUp = () => {
    if (!isSelecting) return
    
    setIsSelecting(false)
    
    const x = Math.min(startPos.x, endPos.x)
    const y = Math.min(startPos.y, endPos.y)
    const width = Math.abs(endPos.x - startPos.x)
    const height = Math.abs(endPos.y - startPos.y)
    
    setSelection({ x, y, width, height })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('In Zwischenablage kopiert!')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🔍 Mockup Debug Tool</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Anleitung:</h2>
          <div className="space-y-2 text-gray-700">
            <p>• <strong>Klicken:</strong> Einzelne Koordinaten ermitteln</p>
            <p>• <strong>Ziehen:</strong> Rechteck aufziehen für Bereich (Screenshot-Position)</p>
            <p>• Die Koordinaten werden automatisch auf die Original-Bildgröße (4165x4165px) skaliert</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mockup Image */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Mockup-Bild (klicken/ziehen)</h3>
            <div className="relative border border-gray-300 rounded">
              <img
                ref={imageRef}
                src="/images/4249950_90969.jpg"
                alt="Mockup Debug"
                className="w-full h-auto cursor-crosshair"
                onClick={handleImageClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                draggable={false}
              />
              
              {/* Selection Overlay */}
              {isSelecting && (
                <div
                  className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20 pointer-events-none"
                  style={{
                    left: `${Math.min(startPos.x, endPos.x) / 4165 * 100}%`,
                    top: `${Math.min(startPos.y, endPos.y) / 4165 * 100}%`,
                    width: `${Math.abs(endPos.x - startPos.x) / 4165 * 100}%`,
                    height: `${Math.abs(endPos.y - startPos.y) / 4165 * 100}%`,
                  }}
                />
              )}
              
              {/* Final Selection */}
              {selection && !isSelecting && (
                <div
                  className="absolute border-2 border-green-500 bg-green-500 bg-opacity-20 pointer-events-none"
                  style={{
                    left: `${selection.x / 4165 * 100}%`,
                    top: `${selection.y / 4165 * 100}%`,
                    width: `${selection.width / 4165 * 100}%`,
                    height: `${selection.height / 4165 * 100}%`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Coordinates Output */}
          <div className="space-y-4">
            {/* Click Coordinates */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-4">🎯 Klick-Koordinaten</h3>
              <div className="space-y-2">
                <p><strong>X:</strong> {coordinates.x}px</p>
                <p><strong>Y:</strong> {coordinates.y}px</p>
                <button
                  onClick={() => copyToClipboard(`X: ${coordinates.x}, Y: ${coordinates.y}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Koordinaten kopieren
                </button>
              </div>
            </div>

            {/* Selection Area */}
            {selection && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">📐 Screenshot-Bereich</h3>
                <div className="space-y-2">
                  <p><strong>X-Position:</strong> {selection.x}px</p>
                  <p><strong>Y-Position:</strong> {selection.y}px</p>
                  <p><strong>Breite:</strong> {selection.width}px</p>
                  <p><strong>Höhe:</strong> {selection.height}px</p>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <p className="text-sm font-mono">
                    const screenX = {selection.x}<br/>
                    const screenY = {selection.y}<br/>
                    const screenWidth = {selection.width}<br/>
                    const screenHeight = {selection.height}
                  </p>
                </div>
                
                <button
                  onClick={() => copyToClipboard(`const screenX = ${selection.x}\nconst screenY = ${selection.y}\nconst screenWidth = ${selection.width}\nconst screenHeight = ${selection.height}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-3"
                >
                  Code kopieren
                </button>
              </div>
            )}

            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-4">📊 Aktuelle Werte im Code</h3>
              <div className="space-y-2 text-sm font-mono bg-gray-100 p-3 rounded">
                <p>const screenX = 499</p>
                <p>const screenY = 488</p>
                <p>const screenWidth = 630</p>
                <p>const screenHeight = 395</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
          >
            ← Zurück zum Generator
          </a>
        </div>
      </div>
    </div>
  )
} 