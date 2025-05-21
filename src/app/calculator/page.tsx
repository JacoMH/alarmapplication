"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';


export default function Home() {
    const [alarmRate, setAlarmRate] = useState<string>("");
    const [percentageTime, setPercentageTime] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [zone, setZone] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("alarmRate:", Number(alarmRate));
        console.log("alarmRate:", isNaN(Number(alarmRate)));

        // Checks if the input is empty
        if (alarmRate === "" || percentageTime === "") {
            setError("Please enter values in both fields.");
            console.log("enter values");
            return;
        } 

        // Validate inputs are in range
        if ((Number(alarmRate) > 100 || Number(alarmRate) < 0) || (Number(percentageTime) > 50 || Number(percentageTime) < 0)) {
            setError("One or more inputs are out of range.");
            console.log("Out of range");
            return;
        }

        // Successful validation
        setError("");
        console.log("number and not empty");

        // Determine the zone
        const alarmRateNum = Number(alarmRate);
        const percentageTimeNum = Number(percentageTime);

        if (alarmRateNum <= 1 && percentageTimeNum <= (-15 * alarmRateNum + 25)) {
            setZone("Robust");
        } else if ((alarmRateNum <= 1 && percentageTimeNum > (-15 * alarmRateNum + 25)) || (alarmRateNum > 1 && alarmRateNum <= 2 && percentageTimeNum <= (-25 * alarmRateNum + 75))) {
            setZone("Stable");
        } else if ((alarmRateNum <= 2 && alarmRateNum > 1 && percentageTimeNum > (-25 * alarmRateNum + 75)) || (alarmRateNum > 2 && alarmRateNum <= 10 && percentageTimeNum <= (-(25 / 8) * alarmRateNum + 450 / 8))) {
            setZone("Reactive");
        } else if ((alarmRateNum <= 100 && alarmRateNum > 10) || (alarmRateNum > 2 && alarmRateNum <= 10 && percentageTimeNum > (-(25 / 8) * alarmRateNum + 450 / 8))) {
            setZone("Overloaded");
        }


        // Reset input fields
        setAlarmRate("");
        setPercentageTime("");
    }

    useEffect(() => {
        if (error) {
            // Only display for 3 seconds
            const timer = setTimeout(() => {
                setError("");
            }, 3000)

            // Cleans up the timer 
            return () => clearTimeout(timer);
        }
    }, [error])

    // Determines the color of the zone
    const zoneColor = (zone: string) => {
        switch (zone) {
            case "Robust":
                return "text-green-700";
            case "Stable":
                return " text-green-300";
            case "Reactive":
                return "text-yellow-300";
            case "Overloaded":
                return "text-red-500";
            default:
                return "";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-gray-900">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-4xl font-extrabold mb-4">Calculate</h1>
            </div>

            <Image
                src="/images/EEMUA191Revision3.png"
                alt="EEMUA 191 Revision 3 Chart"
                width={500}
                height={500}
                className="mb-4 max-w-[700px] w-full"
            />

             {/* error message */}
            {error && (
                <div role='alert' className="mt-4 text-red-600">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col p-6 bg-white rounded-xl shadow-md">
                            <label htmlFor='alarmRate' className="mb-2 font-semibold text-gray-700">Average alarm rate</label>
                            <input
                                id="alarmRate"
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter value"
                                max={100}
                                min={0}
                                maxLength={3}
                                step="any"
                                value={alarmRate}
                                onChange={(e) => setAlarmRate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col p-6 bg-white rounded-xl shadow-md">
                            <label htmlFor='percentageTime' className="mb-2 font-semibold text-gray-700">Percentage time outside targets</label>
                            <div className='flex flex-row'>
                                <input
                                    id="percentageTime"
                                    type="number"
                                    max={50}
                                    min={0}
                                    step="any"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter value"
                                    value={percentageTime}
                                    onChange={(e) => setPercentageTime(e.target.value)}
                                    aria-describedby='percentageSymbol'
                                />
                                <span id='percentageSymbol' className='self-center pl-2'>%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        Calculate
                    </button>
                </div>
            </form>
            {/* zone */}
            {zone && (
                <div aria-live="polite" className="mt-4 text-lg font-semibold">
                    Zone: <span className={zoneColor(zone)}>{zone}</span>
                </div>
            )}
        </div>
    )
}