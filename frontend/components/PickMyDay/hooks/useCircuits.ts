import React, { useState } from "react"

const useCircuits = () => {

	const [circuits, setCircuits] = useState<Circuit[]>([
		{
			title: "Circuit le mans bugatti",
			id: "c092ksds1",
			events: [
				{
					id: "bskd87op0",
					title: "Journée du 18 mars 2022",
					desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nam numquam sequi quia possimus dolor! Voluptatibus sequi quisquam, laborum suscipit sint odio laboriosam aliquam error sapiente eos odit officia nam?",
					places: 16,
					date: new Date(),
					circuit_id: "c092ksds1",
					base: {
						price: 550.65,
						max_per_person: 5,
						included_option: {
							follower: 0,
							meal: 1,
							additionnal_drivers: 0,
							coach: {
								dedicated: false,
								used: false
							}
						}
					},
					options_pricing: {
						additionnal_drivers: 80,
						follower: 40,
						meal: 47,
						coach: {
							dedicated: 150,
							used: 80
						},
					}
				},
				{
					id: "ssdlz8sd0",
					title: "Journée du 25 mars 2022",
					desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nam numquam sequi quia possimus dolor! Voluptatibus sequi quisquam, laborum suscipit sint odio laboriosam aliquam error sapiente eos odit officia nam?",
					places: 56,
					date: new Date("2022-03-25"),
					circuit_id: "c092ksds1",
					base: {
						price: 640.65,
						included_option: {
							follower: 0,
							meal: 1,
							additionnal_drivers: 0,
							coach: {
								dedicated: false,
								used: false
							}
						}
					},
					options_pricing: {
						additionnal_drivers: 80,
						follower: 40,
						meal: 47,
						coach: {
							dedicated: 150,
							used: 80
						},
					}
				}
			]
		}
	]);

	return circuits
}

export default useCircuits;