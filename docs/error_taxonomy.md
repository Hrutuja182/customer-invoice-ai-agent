# Error Taxonomy for Customer Invoices

Each error type has a level (1-3), a detection rule based on the reference data,
a recipe for the generator, and a source. Sources are filled in during the literature review.

## Level 1: single lookup or calculation

### E1 Missing mandatory field
- Description: a required invoice detail is absent (invoice date, invoice number, customer VAT ID, customer address, payment terms)
- Detected with: fixed checklist of mandatory fields
- Generator recipe: remove one field from the invoice, rotating through the fields
- Truth entry: type, name of the missing field
- Source: § 14 UStG (mandatory invoice details)

### E2 Calculation error
- Description: a line total, the net total or the gross total does not add up
- Detected with: recomputation (quantity x unit price, sum of lines, net + tax)
- Generator recipe: change the total of one line or the final total by a small amount
- Truth entry: type, location (line number or total), expected value, found value
- Source: [to add]

### E3 Wrong unit price
- Description: unit price differs from the price list
- Detected with: products.json (unit_price)
- Generator recipe: change one line's unit price by 10-30% and recompute that line, so the invoice stays internally consistent
- Truth entry: type, line number, expected price, found price
- Source: [to add]

### E4 Wrong tax rate
- Description: tax rate differs from the product's rate
- Detected with: products.json (tax_rate)
- Generator recipe: replace the rate on one line (19% instead of 7%) and recompute the tax
- Truth entry: type, line number, expected rate, found rate
- Source: [to add]

### E5 Customer data mismatch
- Description: name, address or VAT ID differs from the customer master
- Detected with: customers.json
- Generator recipe: change one character group in the VAT ID or swap in another city or street
- Truth entry: type, field, expected value, found value
- Source: [to add]

### E6 Deviating payment terms
- Description: stated payment terms differ from the customer's agreed terms
- Detected with: customers.json (payment_terms_days)
- Generator recipe: replace the terms (14 days instead of 30) and update the due date to match
- Truth entry: type, expected days, found days
- Source: [to add]

### E7 Duplicate invoice
- Description: the same order is invoiced twice, possibly under a different invoice number
- Detected with: log of previously processed invoices (order ID, items, amounts)
- Generator recipe: copy an existing invoice, give it a new number and date
- Truth entry: type, ID of the original invoice
- Source: [to add]

## Level 2: two hops across sources

### E8 Discount tier not applied or wrong
- Description: the customer's discount tier is not reflected in the price
- Detected with: customer -> discount tier (customers.json) -> base price (products.json) -> expected price
- Generator recipe: bill the base price, or apply the wrong tier's discount
- Truth entry: type, line number, expected price, found price, the lookup chain
- Source: [to add]

### E9 Tax status error
- Description: a reverse-charge customer is billed with VAT, or a domestic customer without
- Detected with: customer -> tax status (customers.json) -> required tax treatment
- Generator recipe: add or remove VAT against the customer's tax status
- Truth entry: type, expected treatment, found treatment, the lookup chain
- Source: [to add]

## Level 3: three or more hops with a conditional path

### E10 Expired price agreement
- Description: the discounted price is used after the agreement expired, or the list price is used while it is still valid
- Detected with: customer -> validity date -> compare with invoice date -> choose price rule -> check the line total
- Generator recipe: set the invoice date after the validity date, and bill the discounted price
- Truth entry: type, expected price, found price, the lookup chain
- Source: [to add]

## Not covered (no data available)
Delivery dates, goods receipts and handwritten or scanned documents are out of scope.