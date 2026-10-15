<!-- securefix-brief: written by SecureFix from the project brief. Edit it in SecureFix or here. -->

# Project brief: sanchitaaX/Last-minute-Life-saver

## Overview
A toolkit for the shop’s order-desk that provides customer lookup, invoice retrieval, and stock reporting functions.

## Users and roles
- Order-desk staff: look up customers by username.  
- Customers: download invoices from the website by invoice file name.  
- Warehouse terminal: request a stock line for a single SKU before packing.

## Permissions
- Order-desk staff may call `find_customer` with an exact username.  
- Customers may access only files in `shop/invoices/` via `read_invoice`.  
- Warehouse terminal may call `stock_report` for a given SKU.

## Data and integrations
- Customer records are stored in SQLite (`shop/db.py`), table **customers** with columns `id`, `username`, `email`, `tier`.  
- Invoices are plain-text files in `shop/invoices/`; filenames end with `.txt`.  
- Stock information is obtained by running the script `python -m shop.stock` from `shop/tools.py`.

## Behaviour that must keep working
- Exact username matching in `find_customer`; “ali” must not match “alice”.  
- `list_invoices()` returns sorted `.txt` filenames; the account page displays them (e.g., `INV-1001.txt`, `INV-1002.txt`).  
- `read_invoice(name)` raises an error for missing files, causing “invoice not found” on the website.  
- `stock_report(sku)` returns a line formatted as `"<SKU>: <number> in stock"`; unknown SKUs return `0 in stock`.  
- Warehouse screen parses the stock line format `": in stock"`.

---
SecureFix sends this brief with every fix it writes for this repository, so the changes keep the behaviour described here.
