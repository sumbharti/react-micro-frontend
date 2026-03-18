import { useEffect, useState } from "react";
import type { Contacts } from "./generated/models/ContactsModel.ts";
import { ContactsService } from "./generated/services/ContactsService.ts";
import {
    Button,
    Field,
    Input,
    makeStyles,
    shorthands,
    Spinner,
    Tab,
    TabList,
    tokens,
} from "@fluentui/react-components";
import { ArrowLeftRegular, ArrowRightRegular, SaveRegular, DismissRegular } from "@fluentui/react-icons";
import { appInsights } from './telemetry/appInsights.ts';

const useStyles = makeStyles({
    root: {
        ...shorthands.padding("24px"),
        maxWidth: "1000px",
        margin: "0 auto",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
    },
    backButton: {
        marginRight: "12px",
    },
    title: {
        fontSize: "28px",
        fontWeight: 600,
        margin: 0,
    },
    tabsContainer: {
        marginBottom: "24px",
    },
    processFlow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
    },
    stageCircle: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground1,
        fontSize: "14px",
        cursor: "pointer",
        transition: "background-color 0.2s, color 0.2s",
    },
    stageCircleActive: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colorBrandBackground2,
        color: tokens.colorBrandForeground1,
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background-color 0.2s, color 0.2s",
    },
    stageArrow: {
        fontSize: "20px",
        color: tokens.colorNeutralStroke3,
    },
    tabContent: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        padding: "20px",
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    tabContentFullForm: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        padding: "20px",
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    fullWidth: {
        gridColumn: "1 / -1",
    },
    buttonGroup: {
        display: "flex",
        gap: "12px",
        marginTop: "24px",
    },
    errorMessage: {
        color: tokens.colorStatusDangerForeground1,
        padding: "12px",
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        backgroundColor: tokens.colorStatusDangerBackground3,
        marginBottom: "16px",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
    },
    "@media (max-width: 768px)": {
        tabContent: {
            gridTemplateColumns: "1fr",
        },
        tabContentFullForm: {
            gridTemplateColumns: "1fr",
        },
        fullWidth: {
            gridColumn: "1",
        },
    },
});

const ContactDetailForm = (props: { contactId: string; onCancel: () => void }) => {

    appInsights.trackEvent({ name: "ContactDetailForm_Opened", properties: { contactId: props.contactId } });
    appInsights.trackPageView({ name: "ContactDetailForm", uri: "/contact-detail" });
    appInsights.trackTrace({ message: `ContactDetailForm opened for contact ID: ${props.contactId}`, severityLevel: 1 });

    const { contactId, onCancel } = props;
    const styles = useStyles();

    const [contact, setContact] = useState<Contacts | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Contacts>>({});
    const STAGE_ORDER = ["basic", "contact", "address", "personal"];
    const STAGE_LABELS: Record<string, string> = {
        basic: "Basic",
        contact: "Contact",
        address: "Address",
        personal: "Personal",
    };
    const [selectedTab, setSelectedTab] = useState<string>("basic");

    const currentStageIndex = STAGE_ORDER.indexOf(selectedTab);
    const goToStage = (index: number) => {
        const key = STAGE_ORDER[index];
        if (key) setSelectedTab(key);
    };
    const prevStage = () => {
        if (currentStageIndex > 0) goToStage(currentStageIndex - 1);
    };
    const nextStage = () => {
        if (currentStageIndex < STAGE_ORDER.length - 1) goToStage(currentStageIndex + 1);
    };

    useEffect(() => {
        loadContact();
    }, [contactId]);

    const loadContact = async () => {
        if (!contactId) {
            setError("No contact ID provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await ContactsService.get(contactId);
            if (result.data) {
                setContact(result.data);
                setFormData(result.data);
            } else {
                setError("Failed to load contact details");
            }
        } catch (err) {
            console.error("Error loading contact:", err);
            setError("Error loading contact details");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value || undefined,
        }));
    };

    const handleSave = async () => {
        if (!contactId || !formData) return;

        setSaving(true);
        setError(null);
        try {
            // Only send changed fields
            const changedFields: Partial<Contacts> = {};
            Object.keys(formData).forEach((key) => {
                if (formData[key as keyof Contacts] !== contact?.[key as keyof Contacts]) {
                    changedFields[key as keyof Contacts] = formData[key as keyof Contacts] as any;
                }
            });

            if (Object.keys(changedFields).length === 0) {
                onCancel();
                return;
            }

            const result = await ContactsService.update(contactId, changedFields);
            if (result.success) {
                onCancel();
            } else {
                setError("Failed to save contact");
            }
        } catch (err) {
            console.error("Error saving contact:", err);
            setError("Error saving contact details");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    if (loading) {
        return (
            <div className={styles.root}>
                <div className={styles.loadingContainer}>
                    <Spinner size="large" label="Loading contact details..." />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Button
                    appearance="subtle"
                    icon={<ArrowLeftRegular />}
                    className={styles.backButton}
                    onClick={handleCancel}
                    title="Go back"
                />
                <h1 className={styles.title}>
                    {formData.fullname || "Contact Details"}
                </h1>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {/* process flow bar */}
            <div className={styles.processFlow}>
                <Button
                    appearance="subtle"
                    icon={<ArrowLeftRegular />}
                    onClick={prevStage}
                    disabled={currentStageIndex <= 0}
                    title="Previous stage"
                />
                {STAGE_ORDER.map((key, idx) => (
                    <span key={key} style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                            className={
                                selectedTab === key ? styles.stageCircleActive : styles.stageCircle
                            }
                            onClick={() => goToStage(idx)}
                            aria-label={STAGE_LABELS[key]}
                        >
                            {/* {idx + 1} */}
                        </span>
                        {idx < STAGE_ORDER.length - 1 && (
                            <span className={styles.stageArrow}>&#x2192;</span>
                        )}
                    </span>
                ))}
                <Button
                    appearance="subtle"
                    icon={<ArrowRightRegular />}
                    onClick={nextStage}
                    disabled={currentStageIndex >= STAGE_ORDER.length - 1}
                    title="Next stage"
                />
            </div>

            <div className={styles.tabsContainer}>
                <TabList
                    selectedValue={selectedTab}
                    onTabSelect={(_, data) => setSelectedTab(data.value as string)}
                    appearance="subtle"
                >
                    <Tab value="basic">Basic Information</Tab>
                    <Tab value="contact">Contact Information</Tab>
                    <Tab value="address">Address</Tab>
                    <Tab value="personal">Personal Information</Tab>
                </TabList>
            </div>

            {/* Basic Information Tab */}
            {selectedTab === "basic" && (
                <div className={styles.tabContent}>
                    <Field label="First Name">
                        <Input
                            value={formData.firstname ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("firstname", data.value)
                            }
                        />
                    </Field>

                    <Field label="Last Name">
                        <Input
                            value={formData.lastname ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("lastname", data.value)
                            }
                        />
                    </Field>

                    <Field label="Job Title" className={styles.fullWidth}>
                        <Input
                            value={formData.jobtitle ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("jobtitle", data.value)
                            }
                        />
                    </Field>

                    <Field label="Department">
                        <Input
                            value={formData.department ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("department", data.value)
                            }
                        />
                    </Field>

                    <Field label="Company">
                        <Input
                            value={formData.company ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("company", data.value)
                            }
                        />
                    </Field>
                </div>
            )}

            
            {/* Personal Information Tab */}
            {selectedTab === "personal" && (
                <div className={styles.tabContent}>
                    <Field label="Birthday">
                        <Input
                            type="date"
                            value={
                                formData.birthdate
                                    ? formData.birthdate.split("T")[0]
                                    : ""
                            }
                            onChange={(_, data) =>
                                handleInputChange("birthdate", data.value)
                            }
                        />
                    </Field>

                    <Field label="Anniversary">
                        <Input
                            type="date"
                            value={
                                formData.anniversary
                                    ? formData.anniversary.split("T")[0]
                                    : ""
                            }
                            onChange={(_, data) =>
                                handleInputChange("anniversary", data.value)
                            }
                        />
                    </Field>

                    <Field label="Spouse Name">
                        <Input
                            value={formData.spousesname ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("spousesname", data.value)
                            }
                        />
                    </Field>

                    <Field label="Number of Children">
                        <Input
                            type="number"
                            value={formData.numberofchildren ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("numberofchildren", data.value)
                            }
                        />
                    </Field>
                </div>
            )}

            {/* Contact Information Tab */}
            {selectedTab === "contact" && (
                <div className={styles.tabContent}>
                    <Field label="Email Address 1">
                        <Input
                            type="email"
                            value={formData.emailaddress1 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("emailaddress1", data.value)
                            }
                        />
                    </Field>

                    <Field label="Email Address 2">
                        <Input
                            type="email"
                            value={formData.emailaddress2 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("emailaddress2", data.value)
                            }
                        />
                    </Field>

                    <Field label="Phone 1">
                        <Input
                            type="tel"
                            value={formData.telephone1 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("telephone1", data.value)
                            }
                        />
                    </Field>

                    <Field label="Phone 2">
                        <Input
                            type="tel"
                            value={formData.telephone2 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("telephone2", data.value)
                            }
                        />
                    </Field>

                    <Field label="Mobile Phone">
                        <Input
                            type="tel"
                            value={formData.mobilephone ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("mobilephone", data.value)
                            }
                        />
                    </Field>

                    <Field label="Website">
                        <Input
                            type="url"
                            value={formData.websiteurl ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("websiteurl", data.value)
                            }
                        />
                    </Field>
                </div>
            )}

            {/* Address Information Tab */}
            {selectedTab === "address" && (
                <div className={styles.tabContent}>
                    <Field label="Street Line 1" className={styles.fullWidth}>
                        <Input
                            value={formData.address1_line1 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_line1", data.value)
                            }
                        />
                    </Field>

                    <Field label="Street Line 2" className={styles.fullWidth}>
                        <Input
                            value={formData.address1_line2 ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_line2", data.value)
                            }
                        />
                    </Field>

                    <Field label="City">
                        <Input
                            value={formData.address1_city ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_city", data.value)
                            }
                        />
                    </Field>

                    <Field label="State/Province">
                        <Input
                            value={formData.address1_stateorprovince ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_stateorprovince", data.value)
                            }
                        />
                    </Field>

                    <Field label="Country">
                        <Input
                            value={formData.address1_country ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_country", data.value)
                            }
                        />
                    </Field>

                    <Field label="Postal Code">
                        <Input
                            value={formData.address1_postalcode ?? ""}
                            onChange={(_, data) =>
                                handleInputChange("address1_postalcode", data.value)
                            }
                        />
                    </Field>
                </div>
            )}

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
                <Button
                    appearance="primary"
                    icon={<SaveRegular />}
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                    appearance="secondary"
                    icon={<DismissRegular />}
                    onClick={handleCancel}
                    disabled={saving}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default ContactDetailForm;
