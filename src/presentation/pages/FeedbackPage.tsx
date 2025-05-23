import React, { useState, FormEvent, Fragment } from "react";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import {
    Button,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    TextField
} from "@mui/material";

export const FeedbackPage = () => {
    const [topic, setTopic] = useState("");
    const [rating, setRating] = useState("good");
    const [subscribe, setSubscribe] = useState(false);
    const [comments, setComments] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = { topic, rating, subscribe, comments };
        console.log("Form submitted:", data);
        // Add your submit logic here.
    };

    return (
        <Fragment>
            <Seo title={"Feedback"} />
            <WebsiteLayout>
                <Box
                    sx={{
                        padding: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "calc(100vh - 64px)"
                    }}
                >
                    <ContentCard
                        sx={{
                            backgroundColor: "white",
                            padding: "20px",
                            width: "100%",
                            maxWidth: "600px"
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>{"FeedbackTopic"}</FormLabel>
                                <Select
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        {"Select Topic"}
                                    </MenuItem>
                                    <MenuItem value="complaint">{"Complaints"}</MenuItem>
                                    <MenuItem value="suggestion">{"Suggestion"}</MenuItem>
                                    <MenuItem value="question">{"Question"}</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel component="legend">
                                    {"Experience"}
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <FormControlLabel value="good" control={<Radio />} label={"Good"} />
                                    <FormControlLabel value="neutral" control={<Radio />} label={"Neutral"} />
                                    <FormControlLabel value="bad" control={<Radio />} label={"Bad"} />
                                </RadioGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label={"Additional Comments"}
                                    multiline
                                    rows={4}
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    variant="outlined"
                                />
                            </FormControl>

                            <FormControl margin="normal">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={subscribe}
                                            onChange={(e) => setSubscribe(e.target.checked)}
                                        />
                                    }
                                    label={"Subscribe"}
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ marginTop: "20px" }}
                            >
                                {"Submit"}
                            </Button>
                        </form>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
};