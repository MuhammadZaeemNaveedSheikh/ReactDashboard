/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDukHNZg_WM0B7N7NROK0EleAh2hOzV0JI",
  authDomain: "dashboard-fd9ba.firebaseapp.com",
  projectId: "dashboard-fd9ba",
  storageBucket: "dashboard-fd9ba.appspot.com",
  messagingSenderId: "958061652719",
  appId: "1:958061652719:web:8cf6e424dd8305d97f491a",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [data, setData] = React.useState([]);
  const [addData, setAddData] = React.useState({
    firstname: "",
    lastname: "",
  });
  const [editData, setEditData] = React.useState({
    firstname: "",
    lastname: "",
  });

  const handleEditData = async () => {
    await set(ref(db, `data/${editData.key}`), {
      ...editData,
    });
    setEditData({
      firstname: "",
      lastname: "",
    });
  };

  const handleDelete = async (key) => {
    await remove(ref(db, `data/${key}`));
  };
  const handleAddData = async () => {
    await set(push(ref(db, "data")), {
      ...addData,
    });
    setAddData({
      firstname: "",
      lastname: "",
    });
  };

  React.useEffect(() => {
    onValue(ref(db, "data"), async (snapshot) => {
      const result = [];
      snapshot.forEach((sn) => {
        result.push({
          key: sn.key,
          ...sn.val(),
        });
      });
      setData(result);
    });
  }, [db]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid>
        <Grid container columnSpacing={2}>
          <Grid item md={3}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={addData.firstname}
              onChange={(e) => setAddData({ ...addData, firstname: e.target.value })}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={addData.lastname}
              onChange={(e) => setAddData({ ...addData, lastname: e.target.value })}
            />
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              onClick={handleAddData}
              disabled={!(addData.firstname !== "" && addData.lastname !== "")}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead sx={{ display: "contents" }}>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.fistname}>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell onChange={() => setData([])}>{row.lastname}</TableCell>
                    <TableCell
                      onClick={() => {
                        setEditData(row);
                      }}
                    >
                      Edit
                    </TableCell>
                    <TableCell onClick={() => handleDelete(row.key)}>Delete</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4}>
          <Grid container sx={{ marginTop: "5px" }} component={Paper} rowSpacing={2}>
            <Grid item md={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={editData.firstname}
                onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={editData.lastname}
                onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
              />
            </Grid>
            <Grid item md={12}>
              <Button
                variant="contained"
                onClick={handleEditData}
                disabled={editData.key === undefined}
              >
                update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
