import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TableFooter, TextField } from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TablenonJSF() {
  const [get_non_preemptive, set_non_preemtive] = React.useState([ // สเตจ [สเตจ (value),setstatus ฟังชั่น] ค่าเริ่มต้น ตั้งเป็น array
    // {
    //   ps: "P1",
    //   arrival: 0,
    //   burst: 0,
    //   balance: 0
    // },
  ]);

  const [get_arrival, set_arrival] = React.useState(0);

  const [get_burst, set_burst] = React.useState(0);

  const [get_balance, set_balance] = React.useState(0);

  const [get_time, set_time] = React.useState(0);

  const handdleTime = (ps, arrival, burst, balance) => {
    console.log(ps, arrival, burst, balance);
    Array.from(get_non_preemptive, (x) => {
      //การเปลี่ยนข้อมูลใน array
      if (x.ps === ps) {
        x.ps = ps;
        x.arrival = arrival;
        x.burst = burst;
        x.balance = balance;
        x.check = false;
        x.at = arrival;
      }
    });
    set_non_preemtive(get_non_preemptive);
  };
  const handdleDel = (psx) => {

    set_non_preemtive(get_non_preemptive.filter(({ ps }) => ps !== psx)); // เราดึงค่า  ps ตามเงื่อนไขของเรา 

  };
 

  const handdleSave = () => {
    set_non_preemtive([
      ...get_non_preemptive, // แตกค่า ... แล้วจะเพิ่มค่าใหม่เข้าไป
      {
        ps: "P" + +(get_non_preemptive.length + 1), // 
        arrival: get_arrival, // ส่งค่ามาจาก stat set ไว้ข้างบน
        burst: get_burst,
        balance: get_burst,
        at: get_arrival,
      },
    ]);
    console.log(get_non_preemptive);
  };


  const handdleCheckBalance = () => {
    console.log("ทำงาน...");

    const interval = setInterval(() => { //กำหนดระยะเวลาการทำงานแบบต่อเนื่องตลอด ตามระยะเวลาที่เราระบุ
      const minmin = get_non_preemptive
        .filter(({ balance }) => balance !== 0)
        .map((e) => e.arrival);
      console.log(...minmin);

      set_non_preemtive(
        get_non_preemptive.map((x) => {
          console.log("x");
          console.log(Math.min(...minmin));
          console.log(x.ps);

          if (Math.min(...minmin) === Infinity) {
            clearInterval(interval);
          }
          // get_non_preemptive.filter(({ balance }) => balance === "P1"
          if (x.arrival === Math.min(...minmin)) {
            if (x.balance > 0) {
              if (x.balance === 1) {
                x.checkcolor = true;
              }

              x.balance = x.balance - 1;
            }
          }
          return x;
        })
      );
    }, 1000);
  };

  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Process</TableCell>
              <TableCell>Status</TableCell>
              <TableCell >Arrival Time (ms)</TableCell>
              <TableCell >Burst Time&nbsp;(ms)</TableCell>
              <TableCell >Balance&nbsp;</TableCell>
              <TableCell >CT&nbsp;</TableCell>
              <TableCell >TAT&nbsp;</TableCell>
              <TableCell >WT&nbsp;</TableCell>

              <TableCell align="right">บันทึกข้อมูล&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {get_non_preemptive.map(
              //map วนลูป
              ({ ps, arrival, burst, balance, checkcolor }, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {ps}
                  </TableCell>
                  <TableCell >
                    Ready
                  </TableCell>
                  <TableCell >{arrival}</TableCell>
                  <TableCell >{burst}</TableCell>
                  <TableCell
                    style={{ backgroundColor: !checkcolor ? "#fff" : "red" }}
                    
                  >
                    {balance}
                  </TableCell>
                  <TableCell >
                    0
                  </TableCell>
                  <TableCell >
                    0
                  </TableCell>
                  <TableCell >
                    0
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handdleDel(ps)}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}

            <TableRow>
              <TableCell colSpan={9}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                
              </TableCell>
              <TableCell>

              </TableCell>
              <TableCell component="th" scope="row" >
                NEW
              </TableCell>
              <TableCell>
                <TextField
                  defaultValue={get_arrival}
                  onChange={(e) => set_arrival(parseFloat(e.target.value))}
                  id="outlined-basic"
                  label="Arrival"
                  variant="outlined"
                />
                {/* <input
                  defaultValue={get_arrival}
                  onChange={(e) => set_arrival(parseFloat(e.target.value))}
                  type="number"
                /> */}
              </TableCell>
              <TableCell>
                {/* <input
                  defaultValue={get_burst}
                  onChange={(e) => set_burst(parseFloat(e.target.value))}
                  type="number"
                /> */}
                <TextField
                  defaultValue={get_burst}
                  onChange={(e) => set_burst(parseFloat(e.target.value))}
                  id="outlined-basic"
                  label="Burst"
                  variant="outlined"
                />
              </TableCell>
              
                {/* <input
                  defaultValue={get_balance}
                  onChange={(e) => set_balance(parseFloat(e.target.value))}
                  type="number"
                /> */}

              
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handdleSave}
                >
                  [เพิ่มข้อมูล]
                </Button>
              </TableCell>
              
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9}>
                <Button
                  onClick={handdleCheckBalance}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  RUN
                </Button>
              </TableCell>

              
            </TableRow>

            {/* <label>Show Time :</label>
            <input type="text" value={get_time} />
            <button onClick={handdleCheckBalance}>Run...</button>
            <hr />
            <div>
              <input type="text" value={get_time} />
            </div> */}
          </TableFooter>
        </Table>
      </TableContainer>
      <div style={{
        width: "20%",
        height: "50px",
        background: "green",
        transition: "width 2s"
        
      }}></div>
    </>
  );
}