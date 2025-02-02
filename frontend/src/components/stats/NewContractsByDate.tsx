import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import StatsApi, { ContractsByDate } from "../../libraries/explorer-wamp/stats";
import { cumulativeSumArray } from "../../libraries/stats";

import { Props } from "./TransactionsByDate";

const NewContractsByDate = ({ chartStyle }: Props) => {
  const [newContractsByDate, setContracts] = useState(Array());
  const [date, setDate] = useState(Array());
  const [cumulativeNewContractsByDate, setTotal] = useState(Array());
  const [uniqueDeployedContractsByDate, setUnique] = useState(Array());

  useEffect(() => {
    new StatsApi().newContractsCountAggregatedByDate().then((contracts) => {
      if (contracts) {
        const newContracts = contracts.map((contract: ContractsByDate) =>
          Number(contract.contractsCount)
        );
        setTotal(cumulativeSumArray(newContracts));
        setContracts(newContracts);
        const date = contracts.map((contract: ContractsByDate) =>
          contract.date.slice(0, 10)
        );
        setDate(date);
      }
    });
    new StatsApi()
      .uniqueDeployedContractsCountAggregatedByDate()
      .then((contracts) => {
        if (contracts) {
          const uniqueContracts = contracts.map((contract: ContractsByDate) =>
            Number(contract.contractsCount)
          );
          setUnique(uniqueContracts);
        }
      });
  }, []);

  const getOption = (
    title: string,
    data: Array<number>,
    date: Array<string>
  ) => {
    return {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        backgroundColor: "#F9F9F9",
        show: true,
        color: "white",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: date,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
          filterMode: "filter",
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: "New Contracts",
          type: "line",
          lineStyle: {
            color: "#48d4ab",
            width: 2,
          },
          symbol: "circle",
          itemStyle: {
            color: "#25272A",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(72, 212, 171)",
              },
              {
                offset: 1,
                color: "rgb(201, 255, 239)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
  };

  return (
    <Tabs defaultActiveKey="daily" id="newContractsByDate">
      <Tab eventKey="daily" title="Daily">
        <ReactEcharts
          option={getOption(
            "Daily Number of New Contracts",
            newContractsByDate,
            date
          )}
          style={chartStyle}
        />
      </Tab>
      <Tab eventKey="total" title="Total">
        <ReactEcharts
          option={getOption(
            "Total Number of New Contracts",
            cumulativeNewContractsByDate,
            date
          )}
          style={chartStyle}
        />
      </Tab>
      <Tab eventKey="unique" title="Unique">
        <ReactEcharts
          option={getOption(
            "Daily Number of Unique Contracts",
            uniqueDeployedContractsByDate,
            date
          )}
          style={chartStyle}
        />
      </Tab>
    </Tabs>
  );
};

export default NewContractsByDate;
