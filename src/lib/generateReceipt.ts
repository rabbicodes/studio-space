
import { IBooking } from "@/type/MyBooking";
import jsPDF from "jspdf";

const generateReceipt = (mybooking: IBooking) => {
  const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

  const pageWidth = doc.internal.pageSize.getWidth();
  const center = pageWidth / 2;

  // Colors
  const purple: [number, number, number] = [155, 42, 229];
  const dark: [number, number, number] = [35, 35, 45];
  const gray: [number, number, number] = [120, 120, 130];
  const light: [number, number, number] = [245, 242, 250];

  // Booking Duration
  const [startHour, startMinute] = mybooking.data.startTime.split(":").map(Number);
  const [endHour, endMinute] = mybooking.data.endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;

  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  const totalMinutes = endMinutes - startMinutes;
  const totalHours = totalMinutes / 60;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration = `${hours}h ${minutes}m`;

  // Price Calculation
  const subtotal = totalHours * mybooking.hourlyRate;
  const totalAmount = subtotal + mybooking.securityDeposit;

  // Currency
  const currency = (amount: number) => `$${amount.toFixed(2)}`;

  // Date Format
  const bookingDate = new Date(
    `${mybooking.data.date}T00:00:00`
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Header
  doc.setFillColor(...purple);
  doc.rect(0, 0, pageWidth, 48, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("StudioSpace", 20, 23);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("YOUR CREATIVE SPACE PARTNER", 20, 31);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("RECEIPT", pageWidth - 20, 23, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Booking Confirmation", pageWidth - 20, 31, {
    align: "right",
  });

  // Booking Information
  let y = 65;

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Booking Information", 20, y);

  y += 10;

  doc.setFillColor(...light);
  doc.roundedRect(20, y, pageWidth - 40, 28, 3, 3, "F");

  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text("BOOKING ID", 26, y + 9);
  doc.text("BOOKING STATUS", pageWidth - 65, y + 9);

  doc.setFontSize(9);
  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.text(mybooking._id, 26, y + 18);

  doc.setTextColor(...purple);
  doc.text(mybooking.status.toUpperCase(), pageWidth - 65, y + 18);

  // Customer Information
  y += 43;

  doc.setFontSize(13);
  doc.setTextColor(...dark);
  doc.text("Customer Information", 20, y);

  y += 10;

  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text("CUSTOMER NAME", 20, y);
  doc.text("EMAIL ADDRESS", center + 5, y);

  y += 7;

  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");

  doc.text(mybooking.userName, 20, y);
  doc.text(
    mybooking.email,
    center + 5,
    y,
    { maxWidth: pageWidth / 2 - 25 }
  );

  // Studio Information
  y += 20;

  doc.setFontSize(13);
  doc.setTextColor(...dark);
  doc.text("Studio Information", 20, y);

  y += 10;

  doc.setFillColor(...light);
  doc.roundedRect(20, y, pageWidth - 40, 34, 3, 3, "F");

  doc.setFontSize(11);
  doc.setTextColor(...purple);
  doc.text(mybooking.title, 26, y + 11, {
    maxWidth: pageWidth - 100,
  });

  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text(mybooking.category, 26, y + 20);

  doc.text(mybooking.location, 26, y + 27, {
    maxWidth: pageWidth - 100,
  });

  // Booking Schedule
  y += 49;

  doc.setFontSize(13);
  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Schedule", 20, y);

  y += 10;

  const schedule = [
    ["Booking Date", bookingDate],
    ["Start Time", mybooking.data.startTime],
    ["End Time", mybooking.data.endTime],
    ["Total Duration", duration],
  ];

  schedule.forEach(([label, value]) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(label, 22, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text(value, pageWidth - 22, y, { align: "right" });

    doc.setDrawColor(230, 230, 235);
    doc.line(20, y + 4, pageWidth - 20, y + 4);

    y += 11;
  });

  // Payment Summary
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...dark);
  doc.text("Payment Summary", 20, y);

  y += 12;

  const payments = [
    ["Hourly Rate", `${currency(mybooking.hourlyRate)} / hour`],
    ["Booking Subtotal", currency(subtotal)],
    ["Security Deposit", currency(mybooking.securityDeposit)],
  ];

  payments.forEach(([label, value]) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(label, 22, y);

    doc.setTextColor(...dark);
    doc.text(value, pageWidth - 22, y, { align: "right" });

    y += 9;
  });

  // Total Amount
  y += 4;

  doc.setFillColor(...purple);
  doc.roundedRect(20, y, pageWidth - 40, 23, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TOTAL AMOUNT", 27, y + 15);

  doc.setFontSize(15);
  doc.text(currency(totalAmount), pageWidth - 27, y + 15, {
    align: "right",
  });

  // Footer
  y += 37;

  doc.setDrawColor(220, 220, 225);
  doc.line(20, y, pageWidth - 20, y);

  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(...purple);
  doc.text("Thank you for choosing StudioSpace!", center, y, {
    align: "center",
  });

  y += 7;

  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text(
    "We hope you have a wonderful creative experience.",
    center,
    y,
    { align: "center" }
  );

  // Download PDF
  doc.save(`StudioSpace-Receipt-${mybooking._id}.pdf`);
};

export default generateReceipt;
