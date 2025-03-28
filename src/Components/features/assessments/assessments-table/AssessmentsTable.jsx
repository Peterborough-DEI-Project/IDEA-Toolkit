import React, {useState} from 'react';
import TableLayouts from "../utils/TableLayouts.js";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import AddIcon from "@mui/icons-material/Add";
import StarsCard from "../../../../../../Components/core/Card/StarsCard.jsx";
import Btn from "../../../../../../Components/core/Button/Btn.jsx";
import {Button} from "flowbite-react";
import {Table as FbTable} from "flowbite-react";
import {DropdownWithButton} from "../../../../../../Components/core/Dropdown/index.js";
import __deleteme__ConfirmPopup from "../../../../../../Components/core/Popup/__deleteme__ConfirmPopup.jsx";
import PropTypes from "prop-types";
import tableLayouts from './tableLayouts.js'

AssessmentsTable.propTypes = {
    dataVariant: PropTypes.oneOf(Object.keys(tableLayouts)),
}

function AssessmentsTable({dataVariant = "employeeTemplates"})  {
    const [layout, setLayout] = useState(tableLayouts[dataVariant]);

    const {data, error, isLoading} = useQuery({
        queryFn: () => layout.queryFn(),
        queryKey: ["assessmentsTable-", [dataVariant]],
    });

    return (
        <FbTable className="static divide-y divide-gray-200 ">
            <FbTable.Head className="w-full rounded-t-lg">

                {layout.headers.map((column, index) => (
                    <FbTable.HeadCell key={index}>{column}</FbTable.HeadCell>
                ))}

            </FbTable.Head>
            <FbTable.Body className="w-full">
                {data?.map((row, index) => (
                    <FbTable.Row key={index} className="border-t border-gray-200 ">
                        {layout.dataColumns.map((column, i) => (
                            <FbTable.Cell key={i}
                                          className={` ${i === 0 ? "font-semibold text-gray-900 " : "text-gray-700"}   whitespace-nowrap  dark:text-white`}>{row[column] || "N/A"}</FbTable.Cell>
                        ))}
                        <FbTable.Cell>
                            <DropdownWithButton id={row.id}>
                                {layout.rowActions?.map((action, i) => (
                                    <Link
                                        key={"dropdown-"+action.label}
                                        to={action.link(row.id)}
                                        className="appearance-none flex gap-3 text-gray-700 hover:text-gray-700 rounded py-1 px-1  hover:bg-gray-200 gap transition-colors duration-100 ease-in-out"
                                    >
                                        {action.icon && (
                                            <action.icon/>
                                        )}
                                        {action.label}
                                    </Link>
                                ))}
                            </DropdownWithButton>
                        </FbTable.Cell>
                    </FbTable.Row>
                ))}
            </FbTable.Body>
        </FbTable>

    );
}

export default AssessmentsTable;