import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import QualityScoreCard from "../components/dataQuality/QualityScoreCard";
import ValidationSummary from "../components/dataQuality/ValidationSummary";
import QualityMetricsTable from "../components/dataQuality/QualityMetricsTable";

import {
  getDataQualityReports,
  createDataQualityReport,
  getValidationSummary,
  getQualityMetrics,
  getQualityDashboardSummary,
  generateQualityReport,
} from "../services/dataQualityService";

function DataQualityCenter() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({});
  const [validation, setValidation] = useState({});
  const [metrics, setMetrics] = useState([]);
  const [qualityReport, setQualityReport] = useState({});
  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("selectedOrgId") || ""
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    organization_id: "",
    dataset_id: "",
    dataset_name: "",
    total_records: "",
    missing_records: "",
    duplicate_records: "",
    invalid_records: "",
  });

  const getScore = (item) => {
    return Number(item.quality_score || item.average_quality_score || 0);
  };

  const calculateSummaryFromReports = (reportData) => {
    const data = Array.isArray(reportData) ? reportData : [];

    return {
      total_datasets_checked: data.length,

      excellent_quality: data.filter((item) => getScore(item) >= 90).length,

      good_quality: data.filter(
        (item) => getScore(item) >= 75 && getScore(item) < 90
      ).length,

      warning_quality: data.filter(
        (item) => getScore(item) >= 50 && getScore(item) < 75
      ).length,

      critical_quality: data.filter((item) => getScore(item) < 50).length,

      average_quality_score:
        data.length > 0
          ? (
              data.reduce((sum, item) => sum + getScore(item), 0) /
              data.length
            ).toFixed(2)
          : 0,
    };
  };

  const loadDataQuality = async () => {
    try {
      setLoading(true);

      const selectedOrganizationId =
        organizationId || localStorage.getItem("selectedOrgId");

      const reportData = await getDataQualityReports();

      let summaryData = calculateSummaryFromReports(reportData);

      if (selectedOrganizationId) {
        const apiSummary = await getQualityDashboardSummary(
          selectedOrganizationId
        );

        summaryData = {
          ...apiSummary,
          ...summaryData,
        };
      }

      setReports(Array.isArray(reportData) ? reportData : []);
      setSummary(summaryData || {});
    } catch (error) {
      console.log("Data Quality Load Error:", error.response?.data || error);
      setReports([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataQuality();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "organization_id") {
      setOrganizationId(e.target.value);
      localStorage.setItem("selectedOrgId", e.target.value);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();

    try {
      await createDataQualityReport({
        organization_id: Number(form.organization_id),
        dataset_id: Number(form.dataset_id),
        dataset_name: form.dataset_name,
        total_records: Number(form.total_records),
        missing_records: Number(form.missing_records),
        duplicate_records: Number(form.duplicate_records),
        invalid_records: Number(form.invalid_records),
      });

      setMessage("Data quality report created successfully");

      setForm({
        organization_id: "",
        dataset_id: "",
        dataset_name: "",
        total_records: "",
        missing_records: "",
        duplicate_records: "",
        invalid_records: "",
      });

      loadDataQuality();
    } catch (error) {
      console.log("Create Quality Report Error:", error.response?.data || error);
      setMessage("Failed to create data quality report");
    }
  };

  const loadOrganizationQuality = async () => {
    if (!organizationId) {
      setMessage("Please enter Organization ID");
      return;
    }

    try {
      localStorage.setItem("selectedOrgId", organizationId);

      const validationData = await getValidationSummary(organizationId);
      const metricsData = await getQualityMetrics(organizationId);
      const generatedReport = await generateQualityReport(organizationId);
      const apiSummary = await getQualityDashboardSummary(organizationId);

      const calculatedSummary = calculateSummaryFromReports(metricsData);

      setValidation(validationData || {});
      setMetrics(Array.isArray(metricsData) ? metricsData : []);
      setQualityReport(generatedReport || {});
      setSummary({
        ...apiSummary,
        ...calculatedSummary,
      });
    } catch (error) {
      console.log("Organization Quality Error:", error.response?.data || error);
      setValidation({});
      setMetrics([]);
      setQualityReport({});
      setMessage("Failed to load organization quality data");
    }
  };

  const latestScore =
    metrics.length > 0
      ? metrics[0]
      : reports.length > 0
      ? reports[0]
      : {
          quality_score:
            summary.average_quality_score || summary.quality_score || 0,
          quality_level: summary.quality_level || "N/A",
        };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Data Quality Center"
        subtitle="Measure dataset quality, validation issues and data health metrics."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <SummaryCard
          title="Datasets Checked"
          value={
            summary.total_datasets_checked ||
            summary.total_datasets ||
            reports.length ||
            0
          }
        />

        <SummaryCard
          title="Excellent"
          value={
            summary.excellent_quality ||
            summary.excellent ||
            summary.excellent_count ||
            0
          }
        />

        <SummaryCard
          title="Good"
          value={
            summary.good_quality ||
            summary.good ||
            summary.good_count ||
            0
          }
        />

        <SummaryCard
          title="Warning"
          value={
            summary.warning_quality ||
            summary.warning ||
            summary.warning_count ||
            0
          }
        />

        <SummaryCard
          title="Critical"
          value={
            summary.critical_quality ||
            summary.critical ||
            summary.critical_count ||
            0
          }
        />
      </div>

      <div className="mb-8">
        <QualityScoreCard score={latestScore} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Create Data Quality Report
        </h2>

        <form
          onSubmit={handleCreateReport}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            name="organization_id"
            placeholder="Organization ID"
            value={form.organization_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="dataset_id"
            placeholder="Dataset ID"
            value={form.dataset_id}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="dataset_name"
            placeholder="Dataset Name"
            value={form.dataset_name}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="total_records"
            type="number"
            placeholder="Total Records"
            value={form.total_records}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="missing_records"
            type="number"
            placeholder="Missing Records"
            value={form.missing_records}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="duplicate_records"
            type="number"
            placeholder="Duplicate Records"
            value={form.duplicate_records}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <input
            name="invalid_records"
            type="number"
            placeholder="Invalid Records"
            value={form.invalid_records}
            onChange={handleChange}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            required
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create Report
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Organization Quality Analysis
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadOrganizationQuality}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Load Quality Data
          </button>
        </div>

        <ValidationSummary summary={validation} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Quality Metrics
        </h2>

        {loading ? (
          <Loader />
        ) : metrics.length === 0 ? (
          <EmptyState message="No quality metrics loaded" />
        ) : (
          <QualityMetricsTable metrics={metrics} />
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Generated Quality Report
        </h2>

        <pre className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl overflow-x-auto text-gray-800 dark:text-gray-200">
          {JSON.stringify(qualityReport, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

export default DataQualityCenter;