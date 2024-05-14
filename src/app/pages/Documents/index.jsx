import React, { useEffect, useMemo } from 'react'
import { Card, Container } from "react-bootstrap";
import { Icon } from '@iconify/react';
import ThemeTable from "@/components/ui/Tables/ThemeTable";
import PageHeader from "@/components/common/PageHeader";
import useMainState from '@/hooks/useMainState';
import Dropdowns from '@/components/ui/Dropdowns';
import Nav from 'react-bootstrap/Nav';
import Swal from 'sweetalert2';
import ReactButton from '@/components/ui/ReactButton';
import { api } from '@/services';
import { apiConfig } from '@/configs';
import moment from 'moment';

export default function DocumentsPage() {
    const [state, changeState] = useMainState({
        activeTab: "captured-documents",
        rowCount: 10,
        columns: [
            {
                accessor: "Filename",
                Header: "File name",
            },
            {
                accessor: "Type",
                Header: "File Type",
            },
            {
                accessor: "ProcessStatus",
                Header: "Process Status",
            },
            {
                accessor: "Fund",
                Header: "Fund name",
            },
            {
                accessor: "AccountType",
                Header: "Account Type",
            },
            {
                accessor: "ReceivedDate",
                Header: "Received date",
            },
            {
                accessor: "EffectiveDate",
                Header: "Effective date",
            },
            {
                accessor: "action",
                Header: "Action",
            },
            {
                accessor: "genai_score",
                Header: "GenAI Score",
            },
        ],
        data: [],
        selectedAction: ""
    })

    const changeTab = (changedTab) => {
        changeState({ activeTab: changedTab })
    }
    const data = useMemo(() => {
        return state.data.map((row) => {
            const metadata = JSON.parse(row.Metadata); 
            return {
                Filename:row.Filename,
                Type: row.Type,
                Fund: metadata?.Fund ,
                AccountType:metadata?.Investor,
                ReceivedDate:moment(metadata?.Timestamp).format('DD-MM-yyyy'),
            };
        });
    }, [state.data]);
    
    const columns = useMemo(() => {
        let _columns = [...state.columns]

        if (state.activeTab == "ignored-documents") {
            _columns = _columns.filter(e => e.accessor != 'genai_score');
        }

        return _columns.map((column) => {
            if (column.accessor == 'action') {
                column.Cell = () => {
                    return (
                        <Dropdowns
                            active={state.selectedAction}
                            onChange={(value) => {
                                changeState({
                                    selectedAction: value
                                })
                            }}
                            data={[
                                {
                                    label: "View Doc",
                                    value: "view_doc",
                                },
                                {
                                    label: "View Extracted Data",
                                    value: "view_extract_data",
                                },
                                {
                                    label: "View .json (Delivery file)",
                                    value: "view_json",
                                },
                            ]}>
                            <Icon icon="bi:three-dots-vertical" width={20} />
                        </Dropdowns>
                    )
                }
            } else if (column.accessor == 'genai_score') {
                column.Cell = () => {
                    return (
                        <Dropdowns
                            active={state.selectedGenAIScore}
                            onChange={(value) => {
                                if (value == 'allow_user_feedback') {
                                    onUserFeedback(value)
                                }

                                changeState({
                                    selectedGenAIScore: value
                                })
                            }}
                            data={[
                                {
                                    label: "Allow user feedback?",
                                    value: "allow_user_feedback",
                                },
                                {
                                    label: "Retrain?",
                                    value: "retrain",
                                },
                            ]}>
                            <Icon icon="bi:three-dots-vertical" width={20} />
                        </Dropdowns>
                    )
                }
            }

            return column;
        })
    }, [state.activeTab, state.selectedAction, state.selectedGenAIScore])


    const getDocumentData = () =>{
		// &$filter=StatusID eq '${state.filter}'
		api.get(`${apiConfig.document}?$top=${state.rowCount}`)
		.then((response) => {
			changeState({data:response.value})
		})
		.catch((err) => {})
	}                          
	
	useEffect(()=>{
		getDocumentData();
	},[])


    const onUserFeedback = (value) => {
        Swal.fire({
            title: "Allow user feedback?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#4bc3ff",
        }).then((result) => {
            if (result.isConfirmed) {

            }
        });
    }

    return (
        <div className="documents-page">
            <PageHeader title="Documents" />
            <Container fluid>
                <Card className="">
                    <Card.Body as="div">
                        <Nav fill variant="tabs" className="documents--tabs gap-2" defaultActiveKey={state.activeTab}>
                            <Nav.Item onClick={() => changeTab("captured-documents")}>
                                <Nav.Link eventKey="captured-documents" className="font-14 text-capitalize">Captured for ingestion documents</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => changeTab("ignored-documents")}>
                                <Nav.Link eventKey="ignored-documents" className="font-14 text-capitalize">Ignored for ingestion documents</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='d-flex align-items-center justify-content-end mt-3'>
                        <ReactButton size="sm" className="d-flex align-items-center gap-2 border-0 font-14 download--btn" onClick={() => {}}>
                            <Icon icon="material-symbols:download" className="d-block" /> download
						</ReactButton>
                        </div>
                        <div className="mt-3">
                        <ThemeTable columns={columns} data={data} />
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
