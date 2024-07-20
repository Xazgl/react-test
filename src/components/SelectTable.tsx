import {InputAdornment,Switch,TextField, Typography } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useFilter, useSetSearchParams, useSetViewMode, useViewMode } from "./Provider";

export function SelectTable() {

  const [error, setError] = useState('');;
  const  setViewMode = useSetViewMode()
  const viewMode =  useViewMode()
  const setSearchParams = useSetSearchParams()
  const filter = useFilter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewMode(event.target.checked ? "json" : "table");
  };

  const validateInput = (value: string) => {
    const regex = /^[a-zA-Z0-9]*$/; // Допустимые символы (буквы и цифры)
    if (!regex.test(value)) {
      setError('Недопустимые символы');
    } else {
      setError('');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    setSearchParams({ filter: e.target.value, page: "1" });
  };

  const ButtonStyles = `rounded-t-lg font-bold py-2 px-4 transition duration-200 ease-in-out border-2 border-b-0`;

  return (
    <>
      <nav className="flex  flex-col md:flex-row w-full mt-[10px] gap-[20px]">
        <div className="hidden md:flex flex-col gap-[5px] md:flex-row md:gap-[2px]">
          <button
            style={{ transition: "all 0.5s" }}
            onClick={() => setViewMode("table")}
            className={`${ButtonStyles} ${
              viewMode === "table"
                ? "rounded-t-lg bg-[#ffffff4f] text-white border-white"
                : "bg-transparent text-white border-white"
            }`}
          >
            Таблица <TableChartIcon sx={{ fontSize: "15px" }} />
          </button>
          <button
            style={{ transition: "all 0.5s" }}
            onClick={() => setViewMode("json")}
            className={`${ButtonStyles} ${
              viewMode === "json"
                ? "rounded-t-lg bg-[#272822] text-white border-white"
                : "bg-transparent text-white border-white"
            }`}
          >
            JSON <CodeIcon sx={{ fontSize: "15px" }} />
          </button>
        </div>

        <div className="flex md:hidden w-full mt-[10px]">
          <Switch
            checked={viewMode === "json"}
            onChange={handleChange}
            color="secondary"
            sx={{
                
              "& .MuiSwitch-switchBase:hover": {
                backgroundColor: "transparent",
              },
              "& .MuiSwitch-switchBase:active": {
                backgroundColor: "transparent",
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "black",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "black",
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: "white",
              },
            }}
          />
          <Typography sx={{ fontWeight: "bold", color: "white", ml: 2 }}>
            {viewMode === "json" ? "JSON" : "Таблица"}
          </Typography>
        </div>

        <div className="flex flex-col relative">
          <TextField
            sx={{
              color: "white",
              transition: "all 0.5s",
              border: "1px solid white",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "inherit",
                outline: "none",
                boxShadow: "none",
                color: "white",
                "&:hover fieldset": {
                  borderColor: "white",
                  color: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  outline: "none",
                  boxShadow: "none",
                  color: "white",
                },
                "&.MuiOutlinedInput-notchedOutline": {
                  borderBottom: "none",
                  color: "white",
                },
              },
              "& .MuiOutlinedInput-input": {
                outline: "none",
                boxShadow: "none",
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                borderBottom: "none",
              },
              "& .MuiInputAdornment-root": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            value={filter}
            onChange={handleSearch}
            placeholder="Поиск"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography
              sx={{
                position: "absolute",
                color: "red",
                mt: 1,
                fontSize: "9px",
                left: "50%",
                transform: "translateX(-50%)",
                top: "0",
                whiteSpace: "nowrap",
              }}
            >
              {error}
            </Typography>
          )}
        </div>
      </nav>
    </>
  );
}
