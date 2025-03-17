import  {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {Link } from "react-router";
import {DropdownWithButton} from "../../../../Generic/DropdownMenu/index.js";
import ConfirmPopup from "../../../../Generic/ConfirmPopup.jsx";
import {useQuery} from "@tanstack/react-query";
import TableLayouts from "../utils/TableLayouts.js";
import {Button, Card} from 'flowbite-react'
import {Table as FbTable} from 'flowbite-react'
import stars from "../../../../../assets/star-shape.png";

function AssessmentsTable() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [layout, setLayout] = useState(TableLayouts["adminTemplates"]);

    const {data, error, isLoading} = useQuery({
        queryFn: () => layout.queryFn(),
        queryKey: ["assessmentsTable", [layout]],
    });

    return (
        <div className="flex flex-col items-center justify-center gap-7  w-full p-10 ">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-3xl font-semibold ">Assessments</h3>
                <Link to="/dashboard/assessments/edit/new" className=" h-10 max-w-fit self-end justify-self-start appearance-none border-none inline-flex justify-center items-center gap-3 px-4 items-center  rounded-lg
                                                  text-white bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-600 hover:to-violet-600 transition-[background-position] duration-[250ms] ease-out bg-[length:200%_200%] bg-[position:50%_50%] hover:bg-[position:100%_100%]
                                                    transition-colors duration-200 ease-in-out  align-middle hover:text-white">
                    <AddIcon/>

                    New Assessment
                </Link>
            </div>


            <div className="grid grid-cols-2 w-full overflow-hidden ">
                <Card className="max-w-sm relative drop-shadow-sm">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white z-10">
                        Welcome back, Carlos! <span className="ml-2 text-3xl">👋</span>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        You have <span className="font-bold">5</span> assessments to review.
                    </p>
                    <Button
                        size="sm"
                        className="z-10 bg-white drop-shadow font-bold text-blue-700 hover:border-blue-600 relative transition-colors duration-200 ease-in-out">
                        Review
                    </Button>
                    <img className="pointer-events-none absolute inset-0 z-0" src={stars} alt="stars"/>
                </Card>

                <div>

                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center w-full ">
                        <h5 className="text-lg font-bold ">Your Assessments</h5>
                        <Button className="border-none bg-white h-fit  p-0  ">
                            <svg className="w-7 h-7 text-gray-800 hover:text-blue-700 transition-colors duration-100 ease-in-out dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                      d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                            </svg>

                        </Button>
                    </div>

                    <div>
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
                    </div>
                </div>
                <ConfirmPopup
                    title="Delete Assessment"
                    content={"Your assessment will be permanently deleted"}
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onContinue={() => setDialogOpen(false)}
                />
            </div>


        </div>

    );
}

export default AssessmentsTable;
