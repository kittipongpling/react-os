import React, { useEffect } from "react";
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
  const [get_non_preemptive, set_non_preemtive] = React.useState([
    // สเตจ [สเตจ (value),setstatus ฟังชั่น] ค่าเริ่มต้น ตั้งเป็น array
    // {
    //   ps: "P1",
    //   arrival: 0,
    //   burst: 0,
    //   balance: 0
    // },
  ]);

  const [get_arrival, set_arrival] = React.useState(0);

  const [get_burst, set_burst] = React.useState(0);

  const [get_sort_ct, set_sort_ct] = React.useState([]);

  // const [get_balance, set_balance] = React.useState(0);

  // const [get_time, set_time] = React.useState(0);

  // const [get_color, set_color] = React.useState([
  //   {
  //     c1:10,
  //     c2:20
  //   }
  // ]);

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
        ct: 0,
        tat: 0,
        wt: 0,
        color: {},
        newcolor: Math.floor(Math.random() * 16777215).toString(16),
        state: "Ready"
      },
    ]);
    // console.log(get_non_preemptive);
  };

  useEffect(() => {
    cloneArray();
  }, [get_non_preemptive]);

  const cloneArray = (randomColor) => {
    set_sort_ct([...get_non_preemptive]);
  };
  console.log(get_sort_ct);

  const handdleCheckBalance = () => {
    // console.log("ทำงาน...");

    const interval = setInterval(() => {
      //กำหนดระยะเวลาการทำงานแบบต่อเนื่องตลอด ตามระยะเวลาที่เราระบุ
      const minarrival = get_non_preemptive
        .filter(({ balance }) => balance !== 0)
        .map((e) => e.arrival);
      // console.log(...minarrival);

      const minbalance = get_non_preemptive
        .filter(({ balance }) => balance !== 0)
        .map((e) => e.balance);
      // console.log(...minbalance);

      const maxburst = get_non_preemptive.map((e) => e.ct);
      // console.log(maxburst);

      set_non_preemtive(
        get_non_preemptive.map((x) => {
          // console.log("x");
          // console.log(Math.min(...minarrival));
          // console.log(x.ps);

          if (Math.min(...minarrival) === Infinity) {
            clearInterval(interval);
          }
          // get_non_preemptive.filter(({ balance }) => balance === "P1"

          // if(get_non_preemptive.map(({ arrival }) => arrival === 0)){
          //   if(x.balance === Math.min(...minbalance)){
          //     x.balance = x.balance - 1;
          //   }
          // }


          if (
            get_non_preemptive.filter(({ balance }) => balance === 0).length > 0
          ) {

            
            
            if (x.balance === Math.min(...minbalance)) {
              if (get_non_preemptive.length > 0) {
                let result = get_non_preemptive
                  .map(({ burst }) => burst)
                  .reduce((burst, i) => burst + i);
                console.log(result);
                x.state = "Running";

                x.color = {
                  width: (x.burst - x.balance + 1) / (result / 100) + "%",

                  height: "50px",
                  background: "#" + x.newcolor,
                  transition: "width 2s",
                };
              }
              
              if (x.balance > 0) {
                console.log(
                  get_non_preemptive.reduce(({ burst }, i) => burst + i)
                );

                if (x.balance === 1) {
                  x.state = "terminated";

                  x.checkcolor = true;
                  x.ct = +Math.max(...maxburst) + +x.burst;
                  x.tat = x.ct - x.at;
                  x.wt = x.tat - x.burst;
                  // console.log(maxburst);
                }

                x.balance = x.balance - 1;
              }
            }
            
          } else {

            if(get_non_preemptive.filter(({ arrival }) => arrival === Math.min(...minarrival)).length > 1){ // กรณี arrival time มีค่าเท่ากัน
              if( get_non_preemptive.filter(({ balance }) => balance === Math.min(...minbalance)).length > 1){ //กรณีที่ bust time เท่ากัน มันจะไปหา arrival time ที่นอยที่สุด
                if(x.balance === Math.min(...minarrival)){
                  x.balance = x.balance -1;
                }
              }
            }


            if (x.arrival === Math.min(...minarrival)) {

              

              if (get_non_preemptive.length > 0) {
                let result = get_non_preemptive
                  .map(({ burst }) => burst)
                  .reduce((burst, i) => burst + i);
                console.log(result);
              }
              if (get_non_preemptive.length > 0) {
                let result = get_non_preemptive
                  .map(({ burst }) => burst)
                  .reduce((burst, i) => burst + i);
                console.log(result);

                x.state = "Running";

                x.color = {
                  width: (x.burst - x.balance + 1) / (result / 100) + "%",

                  height: "50px",
                  background: "#" + x.newcolor,
                  transition: "width 2s"
                };
              }
              
              if (x.balance > 0) {
                // { backgroundColor: !checkcolor ? "#fff" : "red" }

                if (x.balance === 1) {
                  x.state = "terminated";
                  x.checkcolor = true;
                  x.checkzie = false;
                  x.ct = x.burst;

                  x.tat = x.ct - x.at;
                  x.wt = x.tat - x.burst;
                }

              }
            }
          }
          return x;
          // console.log(get_non_preemptive.filter(({balance}) => balance === 0));
        })
      );
    }, 1000);
  };

  // const color = () => {
  //   set_non_preemtive(
  //     Array.from(get_non_preemptive,(x) =>{

  //       x.Average =
  //     })
  //   )
  // }

  // let seho = get_color.map((x) =>{

  // })

  //  if(get_non_preemptive.length > 0) {
  //     let result = get_non_preemptive.map(({burst}) => burst).reduce((burst, i) => burst + i);
  //     console.log(result)
  //  }

  // if(get_sort_ct.length >0){
  //   let cct = get_sort_ct.filter(({ct})=> ct > 0).sort((a, b) => {
  //     return a?.ct-b?.ct;
  //   })
  //   console.log(cct , 'ct tatol');
  // }

  
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Process</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Arrival Time (ms)</TableCell>
              <TableCell>Burst Time&nbsp;(ms)</TableCell>
              <TableCell>Balance&nbsp;</TableCell>
              <TableCell>CT&nbsp;</TableCell>
              <TableCell>TAT(ct-at)&nbsp;</TableCell>
              <TableCell>WT(tat-bt)&nbsp;</TableCell>

              <TableCell>deleteProcess&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {get_non_preemptive.map(
              //map วนลูป
              (
                {
                  ps,
                  arrival,
                  burst,
                  balance,
                  checkcolor,
                  ct,
                  tat,
                  wt,
                  newcolor,
                  state,
                },
                index
              ) => (
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ background: "#" + newcolor }}
                  >
                    {ps}
                  </TableCell>
                  <TableCell>{state}</TableCell>
                  <TableCell>{arrival}</TableCell>
                  <TableCell>{burst}</TableCell>
                  <TableCell
                    style={{ backgroundColor: !checkcolor ? "#fff" : "red" }}
                  >
                    {balance}
                  </TableCell>
                  <TableCell>{ct}</TableCell>
                  <TableCell>{tat}</TableCell>
                  <TableCell>{wt}</TableCell>
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
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">
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
              <TableCell>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handdleCheckBalance}
                >
                  [RUN]
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
      {get_sort_ct
        .filter(({ ct }) => ct > 0)
        .sort((a, b) => a?.ct - b?.ct)
        .filter(({ color }) => Object.keys(color).length > 0)
        .map((ele) => {
          return <div style={ele.color}></div>;
        })}
    </>
  );
}
