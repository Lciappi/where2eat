// ** MUI Imports
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyCxfqw7KcnonT2CCLi6Y7CfJpr2GULAJ_M";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleMaps() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("body"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const bad_fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    bad_fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, bad_fetch]);

  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setTime(newValue);
  };

  async function move() {
    console.log("==> Button Pressed <==");
    console.log("query: ", prompt);
    console.log("time: ", time.format("YYYY-MM-DD HH:mm:ss"));
    const formattedTime = time.format("YYYY-MM-DD HH:mm:ss");
    console.log("address: ", value.description);

    let uri = `http://localhost:5050/recommend?query=${encodeURIComponent(
      prompt
    )}&address=${encodeURIComponent(value.description)}&time=${encodeURIComponent(formattedTime)}`;
    var data = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    let resp = await data.json();
    console.log(resp);

    //router.push('/group/eat')
  }

  return (
    <div>
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={6}>
          <Grid item xs={3} />
          <Grid item xs={6} textAlign="left">
            <TextField
              fullWidth
              label="I want to eat ..."
              id="promptId"
              onChange={(event) => {
                setPrompt(event.target.value);
              }}
            />
            <br />
            <br />
            <TimePicker
              label="Time"
              value={time}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <br />
            <br />
            <Autocomplete
              id="google-map-demo"
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.description
              }
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value}
              noOptionsText="No locations"
              onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Add a location" fullWidth />
              )}
              renderOption={(props, option) => {
                const matches =
                  option.structured_formatting.main_text_matched_substrings ||
                  [];

                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [
                    match.offset,
                    match.offset + match.length,
                  ])
                );

                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ display: "flex", width: 44 }}>
                        <LocationOnIcon sx={{ color: "text.secondary" }} />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          width: "calc(100% - 44px)",
                          wordWrap: "break-word",
                        }}
                      >
                        {parts.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{
                              fontWeight: part.highlight ? "bold" : "regular",
                            }}
                          >
                            {part.text}
                          </Box>
                        ))}

                        <Typography variant="body2" color="text.secondary">
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
            />
          </Grid>

          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item textAlign="center" xs={6}>
            <Button fullWidth={true} variant="contained" onClick={move}>
              Eat!
            </Button>
          </Grid>

          <Grid item xs={3} />
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
