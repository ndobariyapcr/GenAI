import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Col, Container, Row } from "react-bootstrap";
import ReactChart from "@/components/ui/ReactChart";
import ThemeTable from "@/components/ui/Tables/ThemeTable";
import { Link } from "react-router-dom";
import { themeConfig } from "@/configs";

const data = [
	{
		title: "title",
		status: "status",
		priority: "priority",
		dueDate: "dueDate",
		superHousehold: "superHousehold",
	},
	{
		title: "title",
		status: "status",
		priority: "priority",
		dueDate: "dueDate",
		superHousehold: "superHousehold",
	},
];

export default function PalettePlatformPage() {
	const options = {
		chart: {
			type: "column",
		},
		title: {
			text: "Firm AUM",
			align: "start",
		},
		xAxis: {
			categories: ["USA", "China", "Brazil", "EU", "India", "Russia"],
			crosshair: true,
			accessibility: {
				description: "Countries",
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "1000 metric tons (MT)",
			},
		},
		tooltip: {
			valueSuffix: " (1000 MT)",
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: "Corn",
				data: [406292, 260000, 107000, 68300, 27500, 14500],
			},
			{
				name: "Wheat",
				data: [51086, 136000, 5500, 141000, 107180, 77000],
			},
		],
	};

	const columns = [
		{
			accessor: "title",
			Header: "Title",
		},
		{
			accessor: "status",
			Header: "Status",
		},
		{
			accessor: "priority",
			Header: "Priority",
		},
		{
			accessor: "dueDate",
			Header: "Due Date",
		},
		{
			accessor: "superHousehold",
			Header: "Super Household",
		},
	];

	return (
		<>
			<PageHeader title="home" />
			<Container fluid>
				<Row>
					<Col xxl={3}>
						<ReactChart options={options} />
					</Col>
					<Col xxl={9}>
						<ThemeTable columns={columns} data={data} />
					</Col>
					<Col xxl={3}>{/* <ReactChart options={options} /> */}</Col>
					<Col xxl={9}>
						<Row>
							<Col xxl={4}>
								<div className="viewer--content">
									<h1 className="font-16 mb-0 text-theme-color text-capitalize">News</h1>
									<p className="font-14 text-parimary-black text-capitalize mb-0 mt-2">
										The requested RSS feed could not be displayed. Please verify the settings and url for this feed. If this problem persists, please
										contact your administrator.
									</p>
								</div>
							</Col>
							<Col xxl={4}>
								<div className="viewer--content">
									<h1 className="font-16 mb-0 text-theme-color text-capitalize">WSRP Viewer</h1>
									<div className="d-flex align-items-baseline mt-2 gap-2">
										<img src={themeConfig.images.FileInfo} alt="FileInfo" className="img-fluid d-block" />
										<p className="font-14 text-parimary-black text-capitalize mb-0 ">
											<Link to="#!" className="text-decoration-none text-parimary-black text-nowrap">
												Open the tool pane
											</Link>
											&nbsp;Open the tool pane and select a trusted portlet server and portlet.
										</p>
									</div>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}
