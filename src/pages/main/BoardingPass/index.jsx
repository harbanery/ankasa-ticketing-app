import BoardingPass from "../../../components/module/BoardingPass";

const BoardingPassPage = () => {
  const checkout = [
    {
      total_passegers: 2,
      details: [
        {
          seats: "A-1",
        },
        {
          seats: "A-2",
        },
      ],
      tickets: [
        {
          class: "Economy",
          gate: "221",
          arrivals: [
            {
              schedule: "Monday, 20 July 2024 - 12:33",
              cities: [
                {
                  countries: [
                    {
                      code: "JPN",
                    },
                  ],
                },
              ],
            },
          ],
          departure: [
            {
              schedule: "Monday, 20 July 2024 - 12:33",
              cities: [
                {
                  countries: [
                    {
                      code: "IDN",
                    },
                  ],
                },
              ],
            },
          ],
          merchant: [
            {
              images: "/src/assets/garuda_indonesia.png",
            },
          ],
        },
      ],
    },
  ];
  return <BoardingPass checkout={checkout}/>;
};
export default BoardingPassPage;
