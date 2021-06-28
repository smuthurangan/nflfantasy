/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation } from 'react-router-dom'
import Spinner from "react-bootstrap/cjs/Spinner";



// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {thead, tbody} from "variables/general";
import Box from "@material-ui/core/Box";

function RegularTables() {
    const location = useLocation();
    const id = location.pathname.slice(location.pathname.length - 2);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] =  React.useState(true);
    const styles = {
//style for font size
        resize:{
            fontSize:10
        },
    }

    React.useEffect(() => {
        const options = {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'}),
            mode: 'cors'
        };

        fetch('/weekdstrank?id=' + id, options,).then((res) => {
            return res.json();
        })
            .then(jsonData => {
                if (jsonData && jsonData.length > 0) {
                    setLoading(false);
                    setData(jsonData);
                }
            });
    }, []);
    return (
        <>
            <PanelHeader size="sm"/>
            <div className="content">
                <Row>
                    <Col sm={50}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">{id} List</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-secondary">
                                    <tr>
                                        {thead.map((prop, key) => {
                                            if (key === thead.length - 1)
                                                return (
                                                    <th key={key} className="text-left">
                                                        {prop}
                                                    </th>
                                                );
                                            return <th key={key}>{prop}</th>;
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{ textAlign: "center" }} colSpan={22}>
                                    {loading &&
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                    }
                                        </td>
                                    </tr>
                                    {data.map((data, key) => {
                                        const tough = 0;
                                        const easy = 0;
                                        if(key != -1) {
                                            return (
                                                <tr key={key}>
                                                    <td key={key} className="text-left">
                                                        {data.name}
                                                    </td>
                                                    <td key={key}>
                                                        <a href={'https://www.espn.com/nfl/team/depth/_/name/'+data.team} target={'_self'}>{data.team}</a>
                                                    </td>
                                                    {data.week.map((week, key1) => {
                                                        return(
                                                        <td key={key} className="text-left">

                                                            <Box color="white" bgcolor={(data.rank[key1] >= 16 ||  data.ave[key1] >= 15) ? "green" : week === 'BYE' ? 'black' : 'red'}  width={65} height={50} style={styles.resize}>
                                                                <div width={65} cellPadding={0}>

                                                                    <div>Opp : {week}</div>
                                                                    <div>Rank : {data.rank[key1]}</div>
                                                                    <div>Ave : {data.ave[key1]}</div>
                                                                </div>
                                                            </Box>
                                                        </td>
                                                        )
                                                    })}
                                                    <td key={key}>
                                                        {data.easy}/{data.tough}
                                                    </td>

                                                </tr>
                                            )
                                        }
                                    })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RegularTables;
